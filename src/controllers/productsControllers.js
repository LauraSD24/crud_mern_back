import { pool } from "../config/db.js";

export async function addProduct(req,res) {
    try {
        const data = req.body;
        const [result] = await pool.query("insert into products (name,brand,category,price,stock) values (?,?,?,?,?)",[data.name,data.brand,data.category,data.price,data.stock]);
        console.log(result);
        if(result.affectedRows > 0){
            return res.status(201).json({
                code: 201,
                msg: "Producto agregado con éxito",
                response: true
            });
        }
        return res.status(400).json({
            code: 400,
            msg: "No se pudo agregar el producto",
            response: false
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "Ha ocurrido un error",
            response: false
        });
    }
};

export async function searchProducts(req,res) {
    try {
        const stringData=req.params.search;
        const parts=stringData.split(" ").filter((item)=>item!=="" && item.length > 0);
        let array;
        if(parts.length===1){
            const [result] = await pool.query(`select * from products where name='${parts[0]}' or brand='${parts[0]}' `);
            array=result;
        }else{
            const [result] = await pool.query(`select * from products where (name='${parts[0]}' or name='${parts[1]}') and (brand='${parts[0]}' or  brand='${parts[1]}' ) `);
            array=result;
        }
        return res.status(200).json({
            code: 200,
            msg: "lista de productos",
            response: true,
            data: array
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "Ha ocurrido un error",
            response: false
        });
    }
}

export async function getProducts(req,res) {
    try {
        const [result] = await pool.query("select * from products");
        return res.status(200).json({
            code: 200,
            msg: "lista de productos",
            response: true,
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "Ha ocurrido un error",
            response: false
        });
    }
}

export async function updateProduct(req,res) {
    try {
        const data = req.body;
        const id = parseInt(req.params.id);
        const [result] = await pool.query("update products set name=?, brand=?, category=?, price=?, stock=? where id=?",[data.name,data.brand,data.category,data.price,data.stock,id]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                code: 200,
                msg: "producto actualizado con éxito",
                response: true
            })
        }
        return res.status(400).json({
            code: 400,
            msg: "No se pudo actualizar el producto",
            response: false
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "Ha ocurrido un error",
            response: false
        });
    }
};

export async function deleteProduct(req,res) {
    try {
        const [result] = await pool.query("delete from products where id=?",[parseInt(req.params.id)]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                code: 200,
                msg: "producto eliminado",
                response: true,
            });
        };
        return res.status(400).json({
            code: 400,
            msg: "No se pudo eliminar el producto",
            response: false
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "Ha ocurrido un error",
            response: false
        });
    }
}