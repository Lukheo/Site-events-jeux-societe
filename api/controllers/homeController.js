const { Op } = require('sequelize')


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    // const latest = await Article.findOne({ order: [['id', 'DESC']], raw: true });
    const navHome = true

    // if (!latest) {
    //   res.render('home', { navHome})
    // }else{
    //   res.render('home', { latest, navHome })
    // }
    console.log(req.session)
    res.render('index')

    // useless -----------------------------------------------------------
    // const articles = await Article.findAll({ raw: true })
    // const comments = await Comment.findAll({ raw: true })
    // console.log(articles)
    // console.log(comments)
  },
  search: async (req, res) => {
    const { count: articleCount, rows: articleResults } = await Article.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: req.query.search } },
          { content: { [Op.substring]: req.query.search } }
        ]
      },
      raw: true
    });

    const { count: commentCount, rows: commentResults } = await Comment.findAndCountAll({
      where: {
        content: { [Op.substring]: req.query.search }
      },
      raw: true
    });
  },
  faq: async (req,res) => {
    res.render('FAQ')
  }

}