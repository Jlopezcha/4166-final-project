import { getAllPapers, getPaperById, rentPaperById, reviewPaperById, createNewProduct, updateProduct, deleteProduct } from "../services/researchService.js";

export async function getAllPapersHandler(req, res) {
    const all = await getAllPapers();
    res.status(200).json(all);
}

export async function getPapersByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const product = await getPaperById(id);
  res.status(200).json(product);
}

export async function rentPaperByIdHandler(req, res) {
  const userId = req.user.id;

  const product_id = parseInt(req.params.id);
  const product = await rentPaperById(product_id, userId);

  res.status(200).json(product);
}

export async function reviewPaperByIdHandler(req, res) {
  const rating = req.body.rating;

  const product_id = parseInt(req.params.id);
  const product = await reviewPaperById(product_id, rating);

  res.status(200).json(product);
}

export async function createPaperHandler(req, res) {
  const {name, authors, topic, availability, avg_rating, total_reviews} = req.body;
  const newProduct = await createNewProduct({name, authors, topic, availability: Number(availability), avg_rating, total_reviews});
  res.status(201).json(newProduct);
}

export async function updatePaperHandler(req, res) {
  const id = parseInt(req.params.id);
  let {name, authors, topic, availability, avg_rating, total_reviews} = req.body;

  if(availability){
    availability = Number(availability);
  }

  if(avg_rating){
    avg_rating = Number(avg_rating);
  }

  if(total_reviews){
    total_reviews = Number(total_reviews);
  }


  const newProduct = await updateProduct(id, {name, authors, topic, availability, avg_rating, total_reviews});
  res.status(200).json(newProduct);
}

export async function deletePaperHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteProduct(id);
  res.status(204).send();
}