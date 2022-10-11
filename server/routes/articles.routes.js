import { Router } from "express";

import {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../controllers/articles.controllers.js'

const route = Router();

route.get('/articles', getArticles);

route.get('/articles/:id', getArticle);

route.post('/articles', createArticle);

route.put('/articles/:id', updateArticle);

route.delete('/articles/:id', deleteArticle);

export default route;