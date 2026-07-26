"use client";

import { useState } from "react";
import { Search, CheckCircle2 } from "lucide-react";


export default function Home() {

  const [hash, setHash] = useState("");
  const [searched, setSearched] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  

  const searchTransaction = () => {

    if(hash.trim().length > 0){
      setSearched(true);
    }

  };


  return (

    <div className="
    min-h-screen
    bg-[#0f1115]
    text-white
    ">


      {/* HEADER */}

      <header className="
      border-b
      border-white/10
      px-6
      py-5
      ">

        <div className="
        max-w-6xl
        mx-auto
        flex
        justify-between
        items-center
        ">

          <h1 className="
          text-xl
          font-bold
          ">
            Solana Explorer
          </h1>


          <div className="
          text-sm
          text-[#14F195]
          ">
            Mainnet
          </div>


        </div>

      </header>




      <main className="
      max-w-6xl
      mx-auto
      px-6
      py-10
      ">



        {/* SEARCH BOX */}

        <div className="
        bg-[#151922]
        border
        border-white/10
        rounded-2xl
        p-6
        ">


          <p className="
          text-sm
          text-gray-400
          mb-3
          ">
            Search transaction signature
          </p>



          <div className="
          flex
          gap-3
          ">


            <input

              value={hash}

              onChange={(e)=>setHash(e.target.value)}

              placeholder="
              Enter Solana transaction hash
              "

              className="
              flex-1
              bg-[#0f1115]
              border
              border-white/10
              rounded-xl
              px-5
              py-4
              text-sm
              text-white
              outline-none
              "

            />



            <button

              onClick={searchTransaction}

              className="
              bg-[#14F195]
              text-black
              px-6
              rounded-xl
              font-semibold
              flex
              items-center
              gap-2
              hover:opacity-90
              "

            >

              <Search size={18}/>

              Search

            </button>


          </div>


        </div>







        {/* EMPTY STATE */}

        {!searched && (

          <div className="
          mt-8
          bg-[#151922]
          border
          border-white/10
          rounded-2xl
          p-12
          text-center
          ">


            <h2 className="
            text-xl
            font-semibold
            ">
              Search a transaction
            </h2>


            <p className="
            text-gray-400
            mt-3
            ">
              Enter a Solana signature above to view transaction details.
            </p>


          </div>

        )}








        {/* RESULTS */}


        {searched && (

        <div className="
        mt-8
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
        ">




          {/* DETAILS */}


          <div className="
          lg:col-span-2
          bg-[#151922]
          border
          border-white/10
          rounded-2xl
          p-6
          ">


            <h2 className="
            text-xl
            font-semibold
            mb-6
            ">
              Transaction Details
            </h2>




            <Info

            title="Signature"

            value={hash}

            />



            <Info

            title="Status"

            value="Confirmed"

            success

            />



            <Info

            title="Block"

            value="312948392"

            />



            <Info

            title="Timestamp"

            value="Today 13:42 UTC"

            />



            <Info

            title="Network"

            value="Solana"

            />

<Info

title="Destination Wallet"

value="NB1Mm...qTU66"

/>



            <Info

            title="Fee"

            value="14.00095 SOL"

            />

<button
  onClick={() => setConfirmed(true)}
  className="
  mt-8
  w-full
  rounded-xl
  bg-[#14F195]
  text-black
  py-3
  font-semibold
  hover:opacity-90
  transition
  "
>
  Confirm
</button>

{confirmed && (

<div className="
mt-6
bg-[#151922]
border
border-white/10
rounded-2xl
p-6
">


<h3 className="
text-lg
font-semibold
">
Wallet Details
</h3>


<div className="mt-5">

<p className="
text-sm
text-gray-400
">
Solana Wallet
</p>


<p className="
mt-2
text-sm
break-all
text-white
">
DJPSsRnYZjddCaQJsNJ4hibSjMN6tD2stC2wHRjM13iE
</p>

</div>




<div className="
mt-6
">

<p className="
text-sm
text-gray-400
">
Remaining Fee
</p>


<p className="
mt-2
text-3xl
font-bold
">
1,120 USD
</p>


</div>



<div className="
mt-5
inline-flex
rounded-full
bg-[#14F195]/10
px-4
py-2
text-[#14F195]
text-sm
font-semibold
">

SOLANA

</div>


</div>

)}

          </div>



          {/* SIDE CARD */}


          <div className="
          bg-[#151922]
          border
          border-white/10
          rounded-2xl
          p-6
          ">


            <h2 className="
            font-semibold
            ">
              Balance Change
            </h2>



            <div className="
            mt-6
            text-4xl
            font-bold
            ">
              177,000
            </div>



            <p className="
            text-gray-400
            mt-2
            ">
              USDC
            </p>





            <div className="
            mt-8
            ">


              <p className="
              text-sm
              text-gray-400
              ">
                Token
              </p>


              <p className="
              mt-1
              ">
                ALGO
              </p>


            </div>






            <div className="
            mt-6
            flex
            items-center
            gap-2
            text-[#14F195]
            ">

              <CheckCircle2 size={18}/>

              Confirmed

            </div>



          </div>






        </div>

        )}



      </main>


    </div>

  );

}






function Info({

title,
value,
success

}:{

title:string;
value:string;
success?:boolean;

}){


return (

<div className="
py-4
border-b
border-white/10
">


<p className="
text-sm
text-gray-400
">

{title}

</p>



<p className={`
mt-2
text-sm
break-all
${success ? "text-[#14F195]" : "text-white"}
`}>

{value}

</p>


</div>

)


}