import { Router } from "express";

import {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../controllers/articles.controllers.js'

const route = Router();

route.get('/api/articles', getArticles);

route.get('/api/articles/:id', getArticle);

route.post('/api/articles', createArticle);

route.put('/api/articles/:id', updateArticle);

route.delete('/api/articles/:id', deleteArticle);

export default route;