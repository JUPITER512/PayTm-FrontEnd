import React, { useEffect, useState } from 'react'
import { Appbar } from '../../components/Appbar'
import Users from '../../components/Users'
import Balance from '../../components/Balance'
import axios from 'axios'

const Dashboard = () => {
  const [balance, setBalance] = useState('');

	const username=localStorage.getItem("user")
	console.log(username)
  async function fetchBalance() {
    try {
        const response = await axios.get("https://paytm-backend-ruddy.vercel.app/api/v1/account/balance", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
     
      const balanceData = response.data.balance;
      console.log(balanceData)
      return balanceData;
    } catch (error) {
      console.error("Error fetching balance:");
      return null;
    }
  }

  useEffect(() => {
    async function getBalance() {
      const balanceData = await fetchBalance();
      if (balanceData !== null) {
        const bln = parseFloat(balanceData).toFixed(2); // Round to 2 decimal places
        setBalance(bln);
      }
    }
    getBalance();
  }, []);

  return (
    <div>
      <Appbar username={username} />
      <div className='m-8'>
        <Balance balance={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;