import { pool } from "../db.js";

export const getArticles = async (req, res) => {
  try {
    const [articles] = await pool.query("SELECT * FROM Articles");
    if (!articles.length) {
      return res.status(404).json({ message: "Articles not found" });
    }
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getArticle = async (req, res) => {
  try {
    const [articles] = await pool.query("SELECT * FROM Articles WHERE idArticle = ?", [
      req.params.id,
    ]);
    if (!articles.length) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createArticle = async (req, res) => {
    try {
      const {
        articleName,
        stock,
        size
      } = req.body;
    
      const [result] = await pool.query(
        "INSERT INTO Articles(articleName, stock, size) VALUES (?, ?, ?)",
        [
            articleName,
            stock,
            size
        ]
      );
      res.json({
        id: result.insertId,
        articleName,
        stock,
        size
      });
      
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
};
  
export const updateArticle = async (req, res) => {
    const {
        articleName,
        stock,
        size
      } = req.body;
try {
    const result = await pool.query("UPDATE Articles SET ? WHERE idArticle = ?", [
    {
        articleName,
        stock,
        size
    },
    req.params.id,
    ]);
    res.json(result)
    
} catch (error) {
    return res.status(500).json({ message: error.message })
}
};
  
export const deleteArticle = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM Articles WHERE idArticle = ? ",[
        req.params.id,
        ]);
        if (!result.affectedRows) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json({message: 'Article removed successfully'});
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
