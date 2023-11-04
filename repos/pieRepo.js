let fs = require("fs");
const { resolve } = require("path");

const FILE_NAME = "./assets/pies2.json";

let pieRepo = {
  get: (resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  },
  getById: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      }
      let pie = JSON.parse(data).find((pie) => pie.id == id);
      resolve(pie);
    });
  },

  search: (searchObject, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);

        if (searchObject) {
          pies = pies.filter((pie) =>
            (searchObject.id ? pie.id == searchObject.id : true) &&
            searchObject.name
              ? pie.name
                  .toLowerCase()
                  .indexOf(searchObject.name.toLowerCase()) >= 0
              : true
          );
        }
        resolve(pies);
      }
    });
  },

  insert: (newData, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            reject();
          }
          resolve(newData);
        });
      }
    });
  },
  update: (newData, id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        let findPie = pies.find((pie) => pie.id == id);

        if (findPie) {
          Object.assign(findPie, newData);
        }
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            reject();
          }
          resolve(newData);
        });
      }
    });
  },

  delete: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        let findIndexPie = pies.findIndex((pie) => pie.id == id);

        if (findIndexPie != -1) {
          pies.splice(findIndexPie, 1);
        }
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            reject();
          }
          resolve(findIndexPie);
        });
      }
    });
  },
};

module.exports = pieRepo;
