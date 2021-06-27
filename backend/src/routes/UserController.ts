const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const staticfile = path.resolve(__dirname, "../../../mocks", "users.json");
//TODO to move the file read and write to a common function
const getUsers = async (req: any, res: any) => {
  let usersjson = await fsPromises.readFile(staticfile, "utf8");
  let parseuserjson = JSON.parse(usersjson);
  let mailId = req.headers.emailid;
  let domain = mailId.split("@").pop();
  let filteredResults = {
    users: parseuserjson.users.filter((user: any) => {
      return user.domain === domain;
    })
  };
  res.send(filteredResults);
};

const authcall = async (req: any, res: any) => {
  let usersjson = await fsPromises.readFile(staticfile, "utf8");
  let parseuserjson = JSON.parse(usersjson);
  if (
    parseuserjson.users.find((user: any) => {
      return (
        user.emailId === req.headers.emailid &&
        user.passWord === req.headers.password
      );
    })
  )
    res.send("Authenticated Successfully");
  else {
    res.status(401);
    res.send("Not Authorised successfull");
  }
};

const registerUsers = async (req: any, res: any) => {
  try {
    let usersjson = await fsPromises.readFile(staticfile, "utf8");
    let parseuserjson = JSON.parse(usersjson);
    let users = parseuserjson.users;
    if (users.find((user: any) => user.emailId === req.body.emailId)) {
      res.status(409).send("User already exists");
    } else {
      let newUser = req.body;
      (newUser.kudosGivenTo = []), (newUser.numberOfKudosRemaining = 3);
      newUser.domain = newUser.emailId.split("@").pop();
      parseuserjson.users.push(newUser);
      await fsPromises.writeFile(staticfile, JSON.stringify(parseuserjson));
      res.send("registration Successfull");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Error occured");
  }
};

export { getUsers, registerUsers, authcall };
