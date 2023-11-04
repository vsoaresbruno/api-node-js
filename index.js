let express = require("express");
let pieRepo = require("./repos/pieRepo");
let app = express();

let router = express.Router();

//This is a middleware to support JSON data parsing in request object
app.use(express.json());

router.get("/", (req, res, next) => {
  pieRepo.get(
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All pies retrieved",
        data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

router.get("/search", (req, res, next) => {
  let searchObject = {
    id: req.query.id,
    name: req.query.name,
  };

  pieRepo.search(
    searchObject,
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Search pie retrieved",
        data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

router.get("/:id", (req, res, nex) => {
  pieRepo.getById(
    req.params.id,
    (data) => {
      if (!data) {
        res.status(404).json({
          status: 404,
          statusText: "Not found",
          message: `The pie ${req.params.id} does't exists`,
          error: {
            code: "NOT_FOUND",
            message: `The pie ${req.params.id} does't exists`,
          },
        });
      }
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Single pie retrieved",
        data,
      });
    },
    (err) => {
      next(err);
    }
  );
});
router.post("/", (req, res, next) => {
  console.log("req.body", req.body);
  pieRepo.insert(
    req.body,
    (data) => {
      res.status(201).json({
        status: 200,
        statusText: "Created",
        message: "New pie added",
        data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

router.put("/:id", (req, res, next) => {
  pieRepo.getById(req.params.id, (data) => {
    if (!data) {
      res.status(404).json({
        status: 404,
        statusText: "Not found",
        message: `The pie ${req.params.id} does't exists`,
        error: {
          code: "NOT_FOUND",
          message: `The pie ${req.params.id} does't exists`,
        },
      });
    }
    pieRepo.update(
      req.body,
      req.params.id,
      (data) => {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: `Pie ${req.params.id} updated`,
          data,
        });
      },
      (err) => {
        next(err);
      }
    );
  });
});

router.patch("/:id", (req, res, next) => {
  pieRepo.getById(req.params.id, (data) => {
    if (!data) {
      res.status(404).json({
        status: 404,
        statusText: "Not found",
        message: `The pie ${req.params.id} does't exists`,
        error: {
          code: "NOT_FOUND",
          message: `The pie ${req.params.id} does't exists`,
        },
      });
    }
    pieRepo.update(
      req.body,
      req.params.id,
      (data) => {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: `Pie ${req.params.id} updated`,
          data,
        });
      },
      (err) => {
        next(err);
      }
    );
  });
});

router.delete("/:id", (req, res, next) => {
  pieRepo.getById(req.params.id, (data) => {
    if (!data) {
      res.status(404).json({
        status: 404,
        statusText: "Not found",
        message: `The pie ${req.params.id} does't exists`,
        error: {
          code: "NOT_FOUND",
          message: `The pie ${req.params.id} does't exists`,
        },
      });
    }
    pieRepo.delete(
      req.params.id,
      (data) => {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: `Pie ${req.params.id} is deleted`,
          data: `Pie ${req.params.id}  deleted`,
        });
      },
      (err) => {
        next(err);
      }
    );
  });
});

app.use("/api/", router);

const errorBuilder = (err) => {
  return {
    status: 500,
    statusText: "Internal server error",
    message: err.message,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      errno: err.errno,
      call: err.syscall,
      message: err.message,
    },
  };
};
// exception logger
app.use((err, req, res, next) => {
  console.log(errorBuilder(err));
  next(err);
});

// exception middleware last
app.use((err, req, res, next) => {
  res.status(500).json(errorBuilder(err));
});

var server = app.listen(3000, () =>
  console.log("Node server is running on http://localhost:3000")
);
