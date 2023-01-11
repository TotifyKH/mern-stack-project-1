const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('youre in the users route');
})

router.get('/status', (req, res) => {
  console.log(req.session);
  if(req.session.name){
    res.json({isLoggedIn: true, name: req.session.name});
  }else{
    res.json({isLoggedIn: false});
  }
});

router.post('/login', (req, res) => {
  let {name} = req.body;
  console.log(name);
  req.session.name = name;
  res.json({success: true});
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) =>{
    if(err){
      console.log(err);
    }else{
      res.clearCookie('arcave');
      res.json({success: true});
    }
  })
})

module.exports = router;