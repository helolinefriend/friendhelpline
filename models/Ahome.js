import mongoose from 'mongoose';

const HomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Welcome to our website!' // Default value
  },
  subtitle: {
    type: String,
    required: true, 
    default: 'We are glad to have you here.' // Default value
  },

  subtitle2: {
    type: String,
   
    default: '' // Default value
  },

  subtitle3: {
    type: String,
   
    default: '' // Default value
  },

  subtitle4: {
    type: String,
   
    default: '' // Default value
  },

  subtitle5: {
    type: String,
   
    default: '' // Default value
  },


  subtitle6: {
    type: String,
   
    default: '' // Default value
  },

  subtitle7: {
    type: String,
   
    default: '' // Default value
  },

  subtitle8: {
    type: String,
   
    default: '' // Default value
  },

  subtitle9: {
    type: String,
   
    default: '' // Default value
  },

  subtitle10: {
    type: String,
   
    default: '' // Default value
  },









  subtitle11: {
    type: String,
   
    default: '' // Default value
  },

  subtitle12: {
    type: String,
   
    default: '' // Default value
  },

  subtitle13: {
    type: String,
   
    default: '' // Default value
  },

  subtitle14: {
    type: String,
   
    default: '' // Default value
  },

  subtitle15: {
    type: String,
   
    default: '' // Default value
  },


  subtitle16: {
    type: String,
   
    default: '' // Default value
  },

  subtitle17: {
    type: String,
   
    default: '' // Default value
  },

  subtitle18: {
    type: String,
   
    default: '' // Default value
  },

  subtitle19: {
    type: String,
   
    default: '' // Default value
  },

  subtitle20: {
    type: String,
   
    default: '' // Default value
  },




// 20 t0 40 

subtitle21: {
  type: String,
  required: true, 
  default: 'We are glad to have you here.' // Default value
},

subtitle22: {
  type: String,
 
  default: '' // Default value
},

subtitle23: {
  type: String,
 
  default: '' // Default value
},

subtitle24: {
  type: String,
 
  default: '' // Default value
},

subtitle25: {
  type: String,
 
  default: '' // Default value
},


subtitle26: {
  type: String,
 
  default: '' // Default value
},

subtitle27: {
  type: String,
 
  default: '' // Default value
},

subtitle28: {
  type: String,
 
  default: '' // Default value
},

subtitle29: {
  type: String,
 
  default: '' // Default value
},

subtitle30: {
  type: String,
 
  default: '' // Default value
},

subtitle21: {
  type: String,
 
  default: '' // Default value
},

subtitle32: {
  type: String,
 
  default: '' // Default value
},

subtitle33: {
  type: String,
 
  default: '' // Default value
},

subtitle34: {
  type: String,
 
  default: '' // Default value
},

subtitle35: {
  type: String,
 
  default: '' // Default value
},


subtitle36: {
  type: String,
 
  default: '' // Default value
},

subtitle37: {
  type: String,
 
  default: '' // Default value
},

subtitle38: {
  type: String,
 
  default: '' // Default value
},

subtitle39: {
  type: String,
 
  default: '' // Default value
},

subtitle40: {
  type: String,
 
  default: '' // Default value
},


// 40 to 50 


subtitle41: {
  type: String,
 
  default: '' // Default value
},

subtitle42: {
  type: String,
 
  default: '' // Default value
},

subtitle43: {
  type: String,
 
  default: '' // Default value
},

subtitle44: {
  type: String,
 
  default: '' // Default value
},

subtitle45: {
  type: String,
 
  default: '' // Default value
},


subtitle46: {
  type: String,
 
  default: '' // Default value
},

subtitle47: {
  type: String,
 
  default: '' // Default value
},

subtitle48: {
  type: String,
 
  default: '' // Default value
},

subtitle49: {
  type: String,
 
  default: '' // Default value
},

subtitle50: {
  type: String,
 
  default: '' // Default value
},


  imageUrl: {
    type: String,
    required: false,
    default: '' // Default value
  },

  imageUrl2: {
    type: String,
    
    default: '' // Default value
  },

  imageUrl3: {
    type: String,
    
    default: '' // Default value
  },

  imageUrl4: {
    type: String,
    
    default: '' // Default value
  },

  imageUrl5: {
    type: String,
    
    default: '' // Default value
  },

  imageUrl6: {
    type: String,
    
    default: '' // Default value
  },

  imageUrl7: {
    type: String,
    
    default: '' // Default value
  },

  imageUrl8: {
    type: String,
    
    default: '' // Default value
  },
  
});

const Home = mongoose.models.Home || mongoose.model('Home', HomeSchema);

export default Home;

