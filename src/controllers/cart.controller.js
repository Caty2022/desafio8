const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();
class CartController {
  async nuevoCarrito(req, res) {
    try {
      const nuevoCarrito = await cartRepository.crearCarrito();
      res.json(nuevoCarrito);
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async obtenerProductosDeCarrito(req, res) {
    const carritoId = req.params.cid;
    try {
      const productos = await cartRepository.obtenerProductosDeCarrito(
        carritoId
      );
      if (!productos) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json(productos);
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async agregarProductoEnCarrito(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
      await cartRepository.agregarProducto(cartId, productId, quantity);
     res.send ("Producto agregado");

      
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async eliminarProductoDeCarrito(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
      const carrito = await cartRepository.eliminarProducto(
        cartId,
        productId
      );
      res.json({
        status: "success",
        message: "Producto eliminado del carrito correctamente",
        updatedCart,
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async actualizarProductosEnCarrito(req, res) {
    const cartId = req.params.cid;
    const updatedProducts = req.body;
    // Debes enviar un arreglo de productos en el cuerpo de la solicitud
    try {
      const carrito = await cartRepository.actualizarProductosEnCarrito(
        cartId,
        updatedProducts);
     res.json({
       status: "success",
       message: "Carrito actualizado",
       carrito
     });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async actualizarCantidad(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;
    try {
      const carrito = await cartRepository.actualizarCantidadesEnCarrito(
        cartId,
        productId,
        newQuantity
      );

      res.json({
        status: "success",
        message: "Cantidad del producto actualizada correctamente",
        carrito
      });
    } catch (error) {
      res.status(500).send("Error al actualizar la cantidad de productos");
    }
  }

  async vaciarCarrito(req, res) {
    const cartId = req.params.cid;
    try {
      const updatedCart = await cartRepository.vaciarCarrito(cartId);

      res.json({
        status: "success",
        message:
          "Todos los productos del carrito fueron eliminados correctamente",
        carrito
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

 
}

module.exports = CartController;