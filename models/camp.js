const { Schema, model } = require('mongoose')

const CampSchema = new Schema(
  {
    title: String,
    location: String,
    description: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    represent_photo: {
      type: String,
      default:
        'https://images.designtrends.com/wp-content/uploads/2016/03/29113710/Tropical-Island-Beach-Wallpaper.jpg',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = model('Camp', CampSchema)
