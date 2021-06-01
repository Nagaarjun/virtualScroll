import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  if (
    req.headers.username === "admin@admin.com" &&
    req.headers.password === "admin"
  )
    res.send("Authenticated Successfully");
  else {
    res.status(401);
    res.send("Not Authorised successfull");
  }
});

export { router };
