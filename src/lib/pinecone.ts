// import { Pinecone } from "@pinecone-database/pinecone";
// export const pinecone = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY!,
//   environment: "gcp-starter",
// });
// const index = pinecone.Index("saas");
// export default index;

// try2
// import { PineconeClient } from '@pinecone-database/pinecone'

// export const getPineconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     environment: 'gcp-starter',
//   })

//   return client
// }

// try3
import {PineconeClient } from '@pinecone-database/pinecone'
let pinecone: PineconeClient | null = null

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new PineconeClient()
    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: 'gcp-starter',
    })
  }
  return pinecone
} 