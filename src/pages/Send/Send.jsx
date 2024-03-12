import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Inputbox from '../../components/Inputbox';
import { amountState } from '../../store/formAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';
function Send() {
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const userid = queryparams.get('id');
  const firstname = queryparams.get('firstname');
  const lastname = queryparams.get('lastname');
  const name = firstname + ' ' + lastname;
  const [status, setStatus] = useState('');
  const [transferAmount,setTransferAmount] = useRecoilState(amountState);
  const [balance, setBalance] = useState('');

  async function fetchBalance() {
    try {
      const response = await axios.get("https://paytm-backend-ruddy.vercel.app/api/v1/account/balance", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      const balanceData = response.data.balance;
      console.log(balanceData);
      return balanceData;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  }

  useEffect(() => {
    async function getBalance() {
      const balanceData = await fetchBalance();
      if (balanceData !== null) {
        const bln = parseFloat(balanceData).toFixed(2);
        setBalance(bln);
      }
    }
    getBalance();
  }, []);

  async function sendBalance() {
    try {
      const response = await axios.post("https://paytm-backend-ruddy.vercel.app/api/v1/account/transfer",
        {
          amount: transferAmount,
          to: userid
        },
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        }
      );

      const message = response.data.message;
      if (response.status === 200) {
        setStatus(message);
        const balanceData = await fetchBalance();
        if (balanceData !== null) {
          const bln = parseFloat(balanceData).toFixed(2);
          setBalance(bln);
          setTransferAmount('')
          
        }
      }else{
        setStatus(message)
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setStatus("Failed to transfer balance. Please try again later.");
      setTransferAmount('')


      return null;
    }
  }

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div
          className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Inputbox label={`Amount in $ ${balance}`} placeholder={"Amount"} stateAtom={amountState} />
              </div>
              <button onClick={() => {
                sendBalance();
              }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
            </div>
            <div>
            {status ? (
                <span className={status.includes('Failed') ? 'text-red-500' : 'text-green-500'}>{status}</span>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Send;