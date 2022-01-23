const db = require('../../models/db');

module.exports = {
  update: async (req) => {
    try {
      const user = await db.get('users').find({ email: req.user.email });

      if (!user.value()) {
        return {
          statusCode: 500,
          msg: 'Error in update',
        };
      }

      const normalProperties = ['name', 'address', 'phone'];
      normalProperties.forEach(async (p) => {
        if (req.body[p]) {
          await user.assign({ [p]: req.body[p] }).write();
        }
      });

      if (req.body.avatar) {
        // update avatar
      }

      return {
        statusCode: 200,
        msg: 'OK',
      };
    } catch {
      return {
        statusCode: 500,
        msg: 'Error in update',
      };
    }
  },
};
