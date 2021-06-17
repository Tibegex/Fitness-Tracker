const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate()
      .addFields({ totalDuration: { $sum: "$exercises.duration" } })
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", ({ params, body }, res) => {
    console.log("Your momma is a workout2");
    db.Workout.findOneAndUpdate(
      { _id: params.id },
      { $push: { exercises: body } },
      { new: true }
    )
      .then((updatedWorkout) => {
        res.json(updatedWorkout);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
  app.post("/api/workouts", (req, res) => {
    console.log("Your momma is a workout");
    db.Workout.create({})
      .then((newWorkout) => {
        res.json(newWorkout);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate()
      .addFields({ totalDuration: { $sum: "$exercises.duration" } })
      .sort({ day: -1 })
      .limit(7)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
};
