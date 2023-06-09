import { Uf } from "../models/Uf.js";

class UfService {

    static async findAll() {
        const objs = await Uf.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Uf.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { sigla, name } = req.body;
        const obj = await Uf.create({ sigla, name });
        return await Uf.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { sigla, name } = req.body;
        const obj = await Uf.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'UF não encontrada!';
        Object.assign(obj, { sigla, name });
        return await obj.save();
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Uf.findByPk(id);
        if (obj == null) throw 'UF não encontrada!';
        try {
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possível remover, há dependências!";
        }
    }

}

export { UfService };