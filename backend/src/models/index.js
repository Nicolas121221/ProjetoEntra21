import { sequelize } from '../config/db.js';
import { DataTypes, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

const modelFiles = fs
    .readdirSync(__dirname)
    .filter(file => file.endsWith('.model.js'));

for (const file of modelFiles) {
    const modelModule = await import(`./${file}`);
    if (typeof modelModule.default !== 'function') {
        throw new Error(`Modelo exportado por ${file} não é uma função default`);
    }

    const model = modelModule.default(sequelize, DataTypes);

    if (!(model.prototype instanceof Model)) {
        throw new Error(`Modelo em ${file} não é subclasse de Sequelize.Model`);
    }

    const baseName = file.replace('.model.js', '');

    function toPascalCase(str) {
        return str.replace(/(^\w|_\w)/g, s => s.replace('_', '').toUpperCase());
    }
    const modelName = toPascalCase(baseName);

    models[modelName] = model;
}

for (const model of Object.values(models)) {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
}

export default models;