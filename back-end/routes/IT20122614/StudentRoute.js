const router = require("express").Router();
const cloudinary = require("../../config/it20122614/cloudinary");
let Group = require("../../models/IT20122614/Group");
const GroupMembers = require("../../models/IT20122614/groupmembers");
let Topic = require("../../models/IT20122614/RegisterTopic");
const RequestSepervisor = require("../../models/IT20122614/RequestSepervisor");
const Supervisor = require("../../models/IT20122614/Supervisor");
const User = require("../../models/IT20122614/User_IT20122614");
const upload = require("../../config/it20122614/multer");
const { body, validationResult } = require("express-validator");

router.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    let newTopic = new Topic({
      groupid: req.body.groupid,
      topic: req.body.subject,
      message: req.body.message,
      file: result.url,
      field: req.body.field,
      status: "pending",
    });
    await newTopic.save();
    res.json(newTopic);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

router.route("/register/members").post(
  body("email").isEmail().normalizeEmail(),
  body("userId").custom((value) => {
    return GroupMembers.find({
      userId: value,
    }).then((user) => {
      if (user.length > 0) {
        throw "User Id is taken!"; //custom error message
      }
    });
  }),
  (req, res) => {
    // const groupid = req.body.groupid;
    const errors = validationResult(req);
    const groupid = req.body.groupid;
    const userRole = "Student";
    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;
    const isLeader = req.body.isLeader;

    const groupMember = new GroupMembers({
      groupid,
      userRole,
      userId,
      name,
      email,
      isLeader,
    });
    console.log("dispaysssss");
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    } else {
      groupMember
        .save()
        .then(() => {
          res.json("member added");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

router.route("/request/topic").post(
  body("message").isLength({
    min: 6,
  }),
  (req, res) => {
    console.log("called======================");
    const uId = req.body.uId;
    const errors = validationResult(req);
    const field = req.body.supervisorField;
    const topic = req.body.topic;
    const message = req.body.message;
    const groupid = "SE3030_GRP_82";
    const status = "pending";
    const userRole = req.body.userRole;

    const requestTopic = new RequestSepervisor({
      uId,
      field,
      topic,
      message,
      groupid,
      status,
      userRole,
    });
    console.log(uId);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    } else {
      requestTopic
        .save()
        .then((ress) => {
          console.log("worked2===============================");
          res.json(ress);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

router.route("/getsupervisor").get((req, res) => {
  let field = req.query.field;
  let userRole = req.query.userRole;

  //console.log(field);
  User.find({ researchField: field, userRole: userRole })
    .then((supervisor) => {
      res.json(supervisor);
      console.log(supervisor);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/add").post(
  body("groupid").custom((value) => {
    return Group.find({
      groupid: value,
    }).then((user) => {
      if (user.length > 0) {
        throw "Group Id is taken!"; //custom error message
      }
    });
  }),
  (req, res) => {
    const errors = validationResult(req);
    const groupid = req.body.groupid;
    const supercisorid = "";
    const cosupercisorid = "";
    const panelmember = "";
    const report = "";
    const presentation = "";
    const proposal = "";
    const Finalthesis = "";
    const isOngoing = true;
    const isMarked = false;

    console.log(groupid);

    const newGroup = new Group({
      groupid,
      supercisorid,
      cosupercisorid,
      panelmember,
      report,
      presentation,
      proposal,
      Finalthesis,
      isOngoing,
      isMarked,
    });
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    } else {
      newGroup
        .save()
        .then(() => {
          res.json("Group added");
          res.status(200);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

router.post("/topic/add", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const groupid = req.body.groupid;
    const topic = req.body.topic;
    const message = req.body.message;
    const file = result.secure_url;
    const status = false;
    const field = req.body.field;
    const newTopic = new Topic({
      groupid,
      topic,
      message,
      file,
      field,
      status,
    });
    await newTopic.save();
    res.json(newTopic);
    res.status(200).send("added");
  } catch (err) {
    console.log(err + " my error");
  }
});
router.put("/presentation", upload.single("image"), async (req, res) => {
  try {
    const group_Id = req.body.groupid;
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: "presantation.pptx",
      resource_type: "raw",
      raw_convert: "aspose",
    });
    const groupid = { groupid: group_Id };

    const presentation = { $set: { presentation: result.secure_url } };
    const options = { upsert: true };

    const results = await Group.updateOne(groupid, presentation, options);
    console.log(results);
    res.json("presentation added");
    res.status = 200;
  } catch (error) {
    console.log("errrrrrrrr=========================");
    console.log(error);
  }
});
router.put("/report", upload.single("image"), async (req, res) => {
  try {
    const group_Id = req.body.groupid;
    const result = await cloudinary.uploader.upload(req.file.path);
    const groupid = { groupid: group_Id };
    const report = { $set: { report: result.secure_url } };
    const options = { upsert: true };

    const results = await Group.updateOne(groupid, report, options);
    console.log(results);
    res.json("presentation added");
    res.status = 200;
  } catch (error) {
    console.log("err");
    console.log(error);
  }
});
router.put("/proposal", upload.single("image"), async (req, res) => {
  try {
    const group_Id = req.body.groupid;
    const result = await cloudinary.uploader.upload(req.file.path);
    const groupid = { groupid: group_Id };
    const report = { $set: { proposal: result.secure_url } };
    const options = { upsert: true };

    const results = await Group.updateOne(groupid, report, options);
    console.log(results);
    res.json("presentation added");
    res.status = 200;
  } catch (error) {
    console.log("err");
    console.log(error);
  }
});
router.put("/thesis", upload.single("image"), async (req, res) => {
  try {
    const group_Id = req.body.groupid;
    const result = await cloudinary.uploader.upload(req.file.path);
    const groupid = { groupid: group_Id };
    const report = { $set: { Finalthesis: result.secure_url } };
    const options = { upsert: true };

    const results = await Group.updateOne(groupid, report, options);
    console.log(results);
    res.json("presentation added");
    res.status = 200;
  } catch (error) {
    console.log("err");
    console.log(error);
  }
});
// Display all users
router.get("/usersGet", async (req, res) => {
  const users = await User.find();

  res.send(users);
});
//display all groups
router.get("/groupget", async (req, res) => {
  const users = await Group.find();

  res.send(users);
});
//display all group members
router.get("/groupmembersget", async (req, res) => {
  const users = await GroupMembers.find();

  res.send(users);
});
//display all supervisors
router.get("/supervisorsget", async (req, res) => {
  const users = await User.find({ userRole: "Supervisor" });

  res.send(users);
});
//display all co-supervisors
router.get("/cosupervisorsget", async (req, res) => {
  const users = await User.find({ userRole: "Co-Supervisor" });

  res.send(users);
});
//display all co-supervisors
router.get("/getAllTopics", async (req, res) => {
  const users = await Topic.find();

  res.send(users);
});

module.exports = router;
