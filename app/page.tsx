"use client";

import { useState } from "react";
import { Search, CheckCircle2, ArrowRight } from "lucide-react";

type Screen =
  | "search"
  | "details"
  | "canceled"
  | "bank"
  | "warning"
  | "confirmed";

export default function Home() {

  const [hash, setHash] = useState("");
  const [screen, setScreen] = useState<Screen>("search");
  const [bank, setBank] = useState<"bofa" | "wells" | null>(null);
  const [beneficiary, setBeneficiary] = useState("");
  const [account, setAccount] = useState("");
  const [routing, setRouting] = useState("");
  const [amount, setAmount] = useState("");


  const searchTransaction = () => {

    if(hash.trim()) {
      setScreen("details");
    }

  };


  return (

    <div className="
    min-h-screen
    bg-[#0f1115]
    text-white
    ">


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


          <span className="
          text-sm
          text-[#14F195]
          ">
            Mainnet
          </span>

        </div>

      </header>



      <main className="
      max-w-5xl
      mx-auto
      px-6
      py-10
      ">


{screen === "warning" && (

<div className="
max-w-xl
mx-auto
bg-[#151922]
border
border-yellow-500/30
rounded-2xl
p-8
">


<div className="
text-center
">


<h2 className="
text-2xl
font-bold
text-yellow-400
">

Remining fees: $370 Total

</h2>


<p className="
mt-4
text-gray-300
">

Deposit the remaining fees to complete the transfer. 

</p>

<div className="
mt-4
inline-flex
items-center
rounded-full
bg-yellow-500/10
border
border-yellow-500/30
px-4
py-2
">

<span className="
w-2
h-2
rounded-full
bg-yellow-400
mr-2
">
</span>

<span className="
text-sm
font-semibold
text-yellow-300
">
Dn5T35muNSyC7CfuyvxR2DX7Y3hTBL5SKWqd5DncvcTW
</span>

</div>


</div>



<div className="
mt-8
space-y-4
">


<Info
title="Bank"
value={
bank === "bofa"
? "Bank of America"
: "Wells Fargo"
}
/>


<Info
title="Beneficiary"
value={beneficiary}
/>


<Info
title="Account"
value={account}
/>


<Info
title="Amount"
value={`$${amount} USD`}
/>


</div>



<div className="
mt-8
rounded-xl
bg-yellow-500/10
border
border-yellow-500/20
p-4
">


<p className="
text-sm
text-yellow-300
">

Warning: Once submitted, this transfer request cannot be modified.

</p>


</div>



<button

onClick={()=>setScreen("confirmed")}

className="
mt-6
w-full
rounded-xl
bg-[#14F195]
text-black
py-3
font-semibold
"

>

Continue

</button>



</div>

)}

{screen === "confirmed" && (

<div className="
max-w-xl
mx-auto
bg-[#151922]
border
border-white/10
rounded-2xl
p-8
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
">

<CheckCircle2
size={40}
className="text-[#14F195]"
/>

</div>



<h2 className="
mt-6
text-3xl
font-bold
">

Confirmed Transaction

</h2>



<p className="
mt-3
text-gray-400
">

Your transaction has been confirmed successfully.

</p>



<div className="
mt-8
rounded-xl
bg-[#0f1115]
border
border-white/10
p-5
text-left
">


<Info
title="Status"
value="Confirmed"
success
/>


<Info
title="Network"
value="Solana"
/>


<Info
title="Transaction"
value={hash}
/>


</div>


</div>

)}

{/* SEARCH */}

{screen === "search" && (

<div className="
bg-[#151922]
border
border-white/10
rounded-2xl
p-6
">


<p className="text-sm text-gray-400 mb-3">
Search transaction signature
</p>


<div className="
flex
gap-3
">


<input

value={hash}

onChange={(e)=>setHash(e.target.value)}

placeholder="Enter Solana transaction hash"

className="
flex-1
bg-[#0f1115]
border
border-white/10
rounded-xl
px-5
py-4
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
"

>

<Search size={18}/>

Search

</button>


</div>


</div>

)}



{/* DETAILS */}

{screen === "details" && (

<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
">


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

onClick={()=>setScreen("canceled")}

className="
mt-8
w-full
rounded-xl
bg-[#14F195]
text-black
py-3
font-semibold
"

>

Confirm

</button>


</div>


<div className="
bg-[#151922]
border
border-white/10
rounded-2xl
p-6
">


<h2 className="font-semibold">
Balance Change
</h2>


<p className="
mt-6
text-4xl
font-bold
">
177,000
</p>


<p className="text-gray-400">
USDC
</p>


<div className="
mt-8
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



{screen === "canceled" && (

<div className="
max-w-xl
mx-auto
bg-[#151922]
border
border-white/10
rounded-2xl
p-8
">


<div className="
text-center
">

<h2 className="
text-2xl
font-bold
text-red-400
">
Transaction Canceled
</h2>


<p className="
mt-3
text-gray-400
">
This transaction has been canceled.
Choose another way to complete the transfer.
</p>


</div>



<div className="
mt-8
space-y-4
">


<button

onClick={()=> {
  setBank("bofa");
  setScreen("bank");
}}

className="
w-full
flex
items-center
gap-4
rounded-xl
border
border-white/10
bg-[#0f1115]
p-5
hover:border-[#14F195]
transition
"

>


<img

src="/bnkam.png"

alt="Bank of America"

className="
h-10
w-auto
"

/>


<div className="text-left">

<p className="
font-semibold
">
Bank of America
</p>


<p className="
text-sm
text-gray-400
">
Domestic transfer USA
</p>


</div>


</button>





<button

onClick={()=> {
  setBank("wells");
  setScreen("bank");
}}

className="
w-full
flex
items-center
gap-4
rounded-xl
border
border-white/10
bg-[#0f1115]
p-5
hover:border-[#14F195]
transition
"

>


<img

src="/wells.png"

alt="Wells Fargo"

className="
h-10
w-auto
"

/>


<div className="text-left">

<p className="
font-semibold
">
Wells Fargo
</p>


<p className="
text-sm
text-gray-400
">
Domestic transfer USA
</p>


</div>


</button>



</div>


</div>

)}





{/* BANK DETAILS */}

{screen === "bank" && (

<div className="
max-w-xl
mx-auto
bg-[#151922]
border
border-white/10
rounded-2xl
p-8
">

<h2 className="
text-2xl
font-bold
">
Transfer Instructions
</h2>


<p className="
mt-2
text-gray-400
">
United States Domestic Transfer
</p>


<div className="mt-6">
<input
placeholder="Beneficiary Name"
value={beneficiary}
onChange={(e)=>setBeneficiary(e.target.value)}
className="w-full bg-[#0f1115] border border-white/10 rounded-xl p-4 mb-3"
/>


<input
placeholder="Account Number"
value={account}
onChange={(e)=>setAccount(e.target.value)}
className="w-full bg-[#0f1115] border border-white/10 rounded-xl p-4 mb-3"
/>


<input
placeholder="Routing Number"
value={routing}
onChange={(e)=>setRouting(e.target.value)}
className="w-full bg-[#0f1115] border border-white/10 rounded-xl p-4 mb-3"
/>


<input
placeholder="Amount USD"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="w-full bg-[#0f1115] border border-white/10 rounded-xl p-4"
/>

</div>
<button

onClick={()=>setScreen("warning")}

className="
mt-8
w-full
rounded-xl
bg-[#14F195]
text-black
py-3
font-semibold
flex
items-center
justify-center
gap-2
"

>

Confirm Transfer

<ArrowRight size={18}/>

</button>

</div>

)}


</main>

</div>

);

}


// COMPONENT

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
