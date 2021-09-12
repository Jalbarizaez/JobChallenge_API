const db = require("../database/dbConfig");

class Package {

  //get all package.
  async getPackages() {
    const results = await db.query(`SELECT * FROM infoPackage`);
    return results.rows;
  }

  //create a package.
  async createPackages({ addressStreet,addressPostalCode,clientName,packageWeight }) {
    await db
      .query("INSERT INTO infoPackage (addressStreet, addressPostalCode, clientName, packageWeight, isDelivered) VALUES ($1, $2, $3, $4, $5 )",
       [addressStreet,addressPostalCode,clientName,parseFloat(packageWeight),false]);
    const results = await db.query(`SELECT * FROM infoPackage`);
    return results.rows;
  }

  //update a package.
  async updatePackages(packageId) {
    let delivery = await db
      .query(`SELECT * FROM infoPackage WHERE id=$1`, [parseInt(packageId)]);
    const deliveryState = !delivery.rows[0].isDelivered;
    await db
      .query(`UPDATE infoPackage SET isDelivered=$1 WHERE id=$2`, [deliveryState,parseInt(packageId)]);
    return;
  }

  //delete a package.
  async deletePackages(packageId) {
    await db.query(`DELETE FROM infoPackage WHERE id=$1`, [parseInt(packageId)]);
    return;
  }
}

module.exports = Package;