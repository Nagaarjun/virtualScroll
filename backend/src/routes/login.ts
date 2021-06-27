const authcall = (req: any, res: any) => {
  if (
    req.headers.username === "admin@admin.com" &&
    req.headers.password === "admin"
  )
    res.send("Authenticated Successfully");
  else {
    res.status(401);
    res.send("Not Authorised successfull");
  }
};

export { authcall };
