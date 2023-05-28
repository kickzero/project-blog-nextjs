// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import API from "@/services/api";
import user from "@/services/user";
import { NextApiRequest, NextApiResponse } from "next";


export default async (
  req: NextApiRequest, 
  res: NextApiResponse
) => {
  // async await
  // console.log(req.headers.cookie);
  
  const method = req.method;
  res.setHeader
  if(method !== "POST") {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method Not Allowed"
    })
  }
  const data = req.body;
  // console.log("1. Api/Login Run | data = ", data) // Server
  try {
    const response = await API.callJson('/jwt-auth/v1/token', {data, method})
    const currentTime = new Date()
    const nextYear = new Date(currentTime.getFullYear() + 1, currentTime.getMonth());
    console.log("response.status", response)

      // console.log("3. Gui Location thong qua Header -> Redirect"); // Server
      res.statusCode = 200;
      res.setHeader('Location', '/');
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Set-Cookie', `token=${response.token}; expires=${nextYear.toUTCString()}; Path=/`);
      res.json(response);
  
    
  } catch(e) {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}
