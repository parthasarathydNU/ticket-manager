// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type DataElement = {
  name: String,
  age: Number
}

/** define arrays like this in type script */
type Data = {
 [index : number] : DataElement;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(
      [
          {
          name: "Abc",
          age: 21
          },
          {
          name: "def",
          age: 22
          },
          {
          name: "gh",
          age: 23
          },  
          {
          name: "jkl",
          age: 24
          },
          {
          name: "mno",
          age: 25
          },
          {
          name: "pqr",
          age: 26
          }                          
      ]
    )
}
