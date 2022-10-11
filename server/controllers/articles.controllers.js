import { pool } from "../db";

export const getArticles = async (req, res) => {
  try {
    const [articles] = await pool.query("SELECT * FROM Articles");
    if (!articles.lenght) {
      return res.status(404).json({ message: "Articles not found" });
    }
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
