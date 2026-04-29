import { getAllBooks, getBookById, rentBookById, reviewBookById, createNewProduct, updateProduct, deleteProduct } from "../services/bookService.js";

export async function getAllBooksHandler(req, res) {
    const all = await getAllBooks();
    res.status(200).json(all);
}

export async function getBooksByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const product = await getBookById(id);
  res.status(200).json(product);
}

export async function rentBookByIdHandler(req, res) {
  const userId = req.user.id;

  const product_id = parseInt(req.params.id);
  const product = await rentBookById(product_id, userId);

  res.status(200).json(product);
}


export async function reviewBookByIdHandler(req, res) {
  const rating = req.body.rating;

  const product_id = parseInt(req.params.id);
  const product = await reviewBookById(product_id, rating);

  res.status(200).json(product);
}

export async function createBookHandler(req, res) {
  const {name, authors, genre, availability, avg_rating, total_reviews} = req.body;
  const newProduct = await createNewProduct({name, authors, genre, availability: Number(availability), avg_rating, total_reviews});
  res.status(201).json(newProduct);
}


export async function updateBookHandler(req, res) {
  const id = parseInt(req.params.id);
  let {name, authors, genre, availability, avg_rating, total_reviews} = req.body;

  if(availability){
    availability = Number(availability);
  }

  if(avg_rating){
    avg_rating = Number(avg_rating);
  }

  if(total_reviews){
    total_reviews = Number(total_reviews);
  }

  const newProduct = await updateProduct(id, {name, authors, genre, availability, avg_rating, total_reviews});
  res.status(200).json(newProduct);
}

export async function deleteBookHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteProduct(id);
  res.status(204).send();
}