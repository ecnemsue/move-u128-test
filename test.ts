import { Transaction } from '@mysten/sui/transactions';
import { Transaction } from "@mysten/sui/transactions";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { bcs } from "@mysten/sui/bcs";
import { TickMath } from '@mmt-finance/clmm-sdk';
import BN from 'bn.js'

const address = '0xc1a02183f9184607fd75ff6f87a04b252afa0838334007ffe434a1fa380ee6b9';

const client_sui = new SuiClient({ url: "https://sui-mainnet.blockvision.org/v1/2vseU7QzuVJLvGM1hu96wxDOnAP" });
async function getliq(lowerSqrtPrice,upperSqrtPrice,amount){
		let tx = new Transaction();
		tx.setGasBudget(184215520);
			tx.moveCall({
			target: `0x406f52151e7dd65addd93b0bdad7989e82aec20c3ae6971954a5140f14a59e4b::clmm_math::get_liquidity_from_a`,
			arguments: [tx.pure.u128(lowerSqrtPrice),tx.pure.u128(upperSqrtPrice),tx.pure.u64(amount),tx.pure.bool(true)],
			typeArguments: [],
		});
const result=(await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address})).results[0].returnValues.map(([bytes, typename]) => {
	if (typename=='u64'){
      const opt = bcs.u64().parse(Uint8Array.from(bytes));
      return opt;
	  }
	 if (typename=='u8'){
      const opt = bcs.u8().parse(Uint8Array.from(bytes));
      return opt;
	  }
      if (typename=='u128'){
        const opt = bcs.u128().parse(Uint8Array.from(bytes));
        return opt;
        }
	 if (typename=='vector<u64>'){
	  const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
      return opt;
	 
	 }
	  return 0;
    });
		console.log('output liquidiy:',result);
		return result[0] ;
		
}

async function getamount(lowerSqrtPrice,upperSqrtPrice,liq){
    let tx = new Transaction();
    tx.setGasBudget(184215520);
        tx.moveCall({
        target: `0x406f52151e7dd65addd93b0bdad7989e82aec20c3ae6971954a5140f14a59e4b::clmm_math::get_delta_a`,
        arguments: [tx.pure.u128(lowerSqrtPrice),tx.pure.u128(upperSqrtPrice),tx.pure.u128(liq),tx.pure.bool(false)],
        typeArguments: [],
    });
    let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
    //console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
  const opt = bcs.u64().parse(Uint8Array.from(bytes));
  return opt;
  }
 if (typename=='u8'){
  const opt = bcs.u8().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u128'){
    const opt = bcs.u128().parse(Uint8Array.from(bytes));
    return opt;
    }
 if (typename=='vector<u64>'){
  const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
  return opt;
 
 }
  return 0;
});
    console.log('output amount:',result);
    return result ;
    
}
async function full_mul(a,b){
    let tx = new Transaction();
    tx.setGasBudget(184215520);
        tx.moveCall({
        target: `0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57::full_math_u128::full_mul`,
        arguments: [tx.pure.u128(a),tx.pure.u128(b)],
        typeArguments: [],
    });
    let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
   // console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
  const opt = bcs.u64().parse(Uint8Array.from(bytes));
  return opt;
  }
 if (typename=='u8'){
  const opt = bcs.u8().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u128'){
    const opt = bcs.u128().parse(Uint8Array.from(bytes));
    return opt;
    }
    if (typename=='u256'){
        const opt = bcs.u256().parse(Uint8Array.from(bytes));
        return opt;
        }
 if (typename=='vector<u64>'){
  const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
  return opt;
 
 }
  return 0;
});
    console.log('output  full_mul amount:',result);
    return result[0] ;
    
}

async function test(){
  let tx = new Transaction();
  tx.setGasBudget(184215520);
      tx.moveCall({
      target: `0x76a638c4a2d8d9ac78e4d8c2910fc1c69e77af1e3969aa77e26f51eaf9e5825a::mult::test`,
      arguments: [],
      typeArguments: [],
  });
  let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
 // console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
const opt = bcs.u64().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u8'){
const opt = bcs.u8().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u128'){
  const opt = bcs.u128().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u256'){
      const opt = bcs.u256().parse(Uint8Array.from(bytes));
      return opt;
      }
if (typename=='vector<u64>'){
const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
return opt;

}
return 0;
});
  console.log('output  test amount:',result);
  return result[0] ;
  
}

async function full_mul_u64(a,b){
  let tx = new Transaction();
  tx.setGasBudget(184215520);
      tx.moveCall({
      target: `0x991a8ab5ccc7af04c5d1327aaff520a074e1444bf7fcde2fcfcb0ad58b9c2af4::full_math_u64::full_mul`,
      arguments: [tx.pure.u64(a),tx.pure.u64(b)],
      typeArguments: [],
  });
  let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
 // console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
const opt = bcs.u64().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u8'){
const opt = bcs.u8().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u128'){
  const opt = bcs.u128().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u256'){
      const opt = bcs.u256().parse(Uint8Array.from(bytes));
      return opt;
      }
if (typename=='vector<u64>'){
const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
return opt;

}
return 0;
});
  console.log('output  full_mul amount:',result);
  return result[0] ;
  
}

async function full_mul_u64_dry(a,b){
  let tx = new Transaction();
  tx.setGasBudget(184215520);
      tx.moveCall({
      target: `0xbdc821b5b1fc09ddd15f5658908d645d8f6e607c201d3e17496164bde198f3ca::mult::mult_u64`,
      arguments: [tx.pure.u64(a),tx.pure.u64(b)],
      typeArguments: [],
  });
  let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
  console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
const opt = bcs.u64().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u8'){
const opt = bcs.u8().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u128'){
  const opt = bcs.u128().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u256'){
      const opt = bcs.u256().parse(Uint8Array.from(bytes));
      return opt;
      }
if (typename=='vector<u64>'){
const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
return opt;

}
return 0;
});
  console.log('output  amount:',result);
  return result[0] ;
  
}
async function full_mul_u128_dry(a,b){
  let tx = new Transaction();
  tx.setGasBudget(184215520);
      tx.moveCall({
      target: `0xbdc821b5b1fc09ddd15f5658908d645d8f6e607c201d3e17496164bde198f3ca::mult::mult_128`,
      arguments: [tx.pure.u128(a),tx.pure.u128(b)],
      typeArguments: [],
  });
  let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
 // console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
const opt = bcs.u64().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u8'){
const opt = bcs.u8().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u128'){
  const opt = bcs.u128().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u256'){
      const opt = bcs.u256().parse(Uint8Array.from(bytes));
      return opt;
      }
if (typename=='vector<u64>'){
const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
return opt;

}
return 0;
});
  console.log('output  amount:',result);
  return result[0] ;
  
}
async function full_mul_u256_dry(a,b,byhand=false){
  let tx = new Transaction();
  tx.setGasBudget(184215520);
      tx.moveCall({
      target: `0xd0aaf02cbc3b0400e8a5d38a336aa58da6b3d2b975696df25c22644d5e31d42d::mult::mult_256`+(byhand?'_byhand':''),
      arguments: [tx.pure.u256(a),tx.pure.u256(b)],
      typeArguments: [],
  });
  let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
 // console.log('response:',response);
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
const opt = bcs.u64().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u8'){
const opt = bcs.u8().parse(Uint8Array.from(bytes));
return opt;
}
if (typename=='u128'){
  const opt = bcs.u128().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u256'){
      const opt = bcs.u256().parse(Uint8Array.from(bytes));
      return opt;
      }
if (typename=='vector<u64>'){
const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
return opt;

}
return 0;
});
  console.log('output  amount:',result);
  return result[0] ;
  
}
async function checked_shlw(a){
    let tx = new Transaction();
    tx.setGasBudget(184215520);
        tx.moveCall({
        target: `0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57::math_u256::checked_shlw`,
        arguments: [tx.pure.u256(a)],
        typeArguments: [],
    });
    let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
  //  console.dir(response.results,{depth: 5});
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
  const opt = bcs.u64().parse(Uint8Array.from(bytes));
  return opt;
  }
 if (typename=='u8'){
  const opt = bcs.u8().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u128'){
    const opt = bcs.u128().parse(Uint8Array.from(bytes));
    return opt;
    }
    if (typename=='u256'){
        const opt = bcs.u256().parse(Uint8Array.from(bytes));
        return opt;
        }
 if (typename=='vector<u64>'){
  const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
  return opt;
 
 }
  return 0;
});
    console.log('output checked_shlw amount:',result);
    return result ;
    
}
async function div_round(a,b){
    let tx = new Transaction();
    tx.setGasBudget(184215520);
        tx.moveCall({
        target: `0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57::math_u256::div_round`,
        arguments: [tx.pure.u256(a),tx.pure.u256(b),tx.pure.bool(true)],
        typeArguments: [],
    });
    let response = await client_sui.devInspectTransactionBlock({transactionBlock:tx, sender: address});
    console.dir(response.results,{depth: 5});
const result=(response).results[0].returnValues.map(([bytes, typename]) => {
if (typename=='u64'){
  const opt = bcs.u64().parse(Uint8Array.from(bytes));
  return opt;
  }
 if (typename=='u8'){
  const opt = bcs.u8().parse(Uint8Array.from(bytes));
  return opt;
  }
  if (typename=='u128'){
    const opt = bcs.u128().parse(Uint8Array.from(bytes));
    return opt;
    }
    if (typename=='u256'){
        const opt = bcs.u256().parse(Uint8Array.from(bytes));
        return opt;
        }
 if (typename=='vector<u64>'){
  const opt = bcs.vector(bcs.u64()).parse(Uint8Array.from(bytes));
  return opt;
 
 }
  return 0;
});
    console.log('output div_round amount:',result);
    return result ;
    
}

let [lower_price,upper_price]=[TickMath.tickIndexToSqrtPriceX64(3000).toString(),TickMath.tickIndexToSqrtPriceX64(3010).toString()]
let amount='393436027539714918';
 let liq=await getliq(BigInt(lower_price),BigInt(upper_price),BigInt(amount));
 let amount_out=await getamount(BigInt(lower_price),BigInt(upper_price),BigInt(Number(liq)));

console.log('amount in:',amount.toString(),'amount out:',amount_out[0])

// await full_mul_u256_dry(BigInt('34673429775949185766360837292402478'),BigInt('181034924319506404827744'));
// await full_mul(BigInt('34673429775949185766360837292402478'),BigInt('181034924319506404827744'));
// console.log((new BN('34673429775949185766360837292402478').mul(new BN('181034924319506404827744'))).toString());

// await checked_shlw(BigInt('6277101735386680763835789423207666494856869170231508749632'))
// await full_mul(BigInt('60438554690243754872543894'),BigInt('60257519765924248467716150'));
//await getamount(BigInt('60257519765924248467716150'),BigInt('60438554690243754872543894'),BigInt('34673429775949185766360837292402478'));
//await test(); 
//result is 171694508075989639272926807135078637209274036313137960775057408
//=110101011011000100000110110000100010110001001010000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//but the correct result should be 171694508075989636843131350589149408176265720865958258047695898
//=110101011011000100000110110000100010110001001010000001110010011000010110101000011101011000111111001101001110010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// let [lower_price,upper_price]=[TickMath.tickIndexToSqrtPriceX64(300000).toString(),TickMath.tickIndexToSqrtPriceX64(300200).toString()]
//  let liq=await getliq(BigInt(lower_price),BigInt(upper_price),393436027539714918);
//  await getamount(BigInt(lower_price),BigInt(upper_price),BigInt(Number(liq)));



// await getliq(BigInt(60257519765924248467716150),BigInt(60438554690243754872543894),1);
// await getamount(BigInt(60257519765924248467716150),BigInt(60438554690243754872543894),BigInt(1090544106));


// console.log('try checked_shlw u256 6277101735386680485945574519584605455948642707010614198272')
// await checked_shlw(BigInt(6277101735386680485945574519584605455948642707010614198272));
// //6277101735386680763835789423207666494856869170231508749632
// console.log('try div_round u256 6277101735386680485945574519584605455948642707010614198272 by 2^64')
// await div_round(BigInt(6277101735386680485945574519584605455948642707010614198272),BigInt(2**64));
//await getamount(BigInt(60257519765924248467716150),BigInt(60438554690243754872543894),BigInt(34673429775949185766360837292402478));

// 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000101011010100101001101110001011100100100111110011100011000100110101000000

// 111111111111111111111111111111111111111111111111111111001100111101011010101000110110001011110001000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
