import productoSchema from "../../Models/product.model";
import { __verificartoken } from "../../helpers/jwtHelpers";

export const registerProduct = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    const { productName, description, price } = req.body;
    token = token.replace("Bearer ", "");
    const data = await __verificartoken(token);
    if (data === undefined) {
      res.status(400).json({
        msg: "Bearer token invalido",
      });
    } else {
      const findproduct = await productoSchema.findOne({
        productName: productName,
      });
      if (!findproduct) {
        const product = new productoSchema({
          productName: productName,
          description: description,
          price: price,
          user: data._id,
        });
        await product.save();
        res.status(200).json({ product });
      }else
      {
        res.status(400).json({msg: "producto ya existe"})
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Bad Request",
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    token = token.replace("Bearer ", "");
    const data = await __verificartoken(token);
    if (data === undefined) {
      res.status(400).json({
        msg: "Bearer token invalido",
      });
    } else {
      const products = await productoSchema
        .find({ user: data._id })
        .sort({ productName: 1 });
      res.status(200).json({ products });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Bad Request",
    });
  }
};
export const getOneProduct = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    const id = req.params.id;
    token = token.replace("Bearer ", "");
    const data = await __verificartoken(token);
    if (data === undefined) {
      res.status(400).json({
        msg: "Bearer token invalido",
      });
    } else {
      const product = await productoSchema.findOne({ _id: id });
      res.status(200).json({
        product,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Bad Request" });
  }
};
export const deleteOneProduct = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    const id = req.params.id;
    token = token.replace("Bearer ", "");
    const data = await __verificartoken(token);
    if (data === undefined) {
      res.status(400).json({
        msg: "Bearer token invalido",
      });
    } else {
      const deleteProduct = await productoSchema.findOneAndDelete({
        _id: id,
        user: data._id,
      });
      if (!deleteProduct) {
        res.status(400).json({ msg: "Product not found" });
      } else {
        res.status(200).json({ msg: "Product deleted" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Bad Request" });
  }
};
export const updateOneProduct = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    const id = req.params.id;
    const { productName, description, price } = req.body;
    token = token.replace("Bearer ", "");
    const data = await __verificartoken(token);
    if (data === undefined) {
      res.status(400).json({
        msg: "Bearer token invalido",
      });
    }
    const updatedProduct = await productoSchema.findOneAndUpdate(
      { _id: id, user: data._id },
      {
        productName,
        description,
        price,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Bad Request" });
  }
};
