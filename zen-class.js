// 1.Find all the topics and tasks which are thought in the month of October
db.topics.find({topicDate:{$regex:"2020-10"}})
db.tasks.find({dueDate:{$regex:"2020-10"}})

// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({driveDate:{$gte:'2020-10-15', $lte:'2020-10-31'}})

// 3.Find all the company drives and students who are appeared for the placement.
db.company_drives.find({},{userID:0})


// 4.Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {
      $group: {
        _id: "$userId",
        problemSolved: {
          $sum: "$problemSolved",
        },
      },
    },
    {
      $project: {
        userId: "$_id",
        problemSolved: 1,
        _id: 0,
      },
    },
  ]);

  

// 5.Find all the mentors with who has the mentee's count more than 15
db.mentors.find({students:{$gt:15}});

// 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.tasks.aggregate([
    {$match:{
        dueDate:{
            $gte:'2020-10-15',
            $lte:'2020-10-31'
          },
          submitted:false
        }
    },

    {
        $group:{
            _id: '$userId',
            date: {
              $sum:1
            },
          }
    },

    {
        $project:{
            userId:"$_id",
            _id:0,
            date:1,
            dueDate:"$dueDate"
          }

    }
]);


