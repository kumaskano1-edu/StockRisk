import React from 'react'
import SeachBar from "../dashboard/SearchBar"
import Chart from "../dashboard/Chart"
import Deposits from "../dashboard/Deposits"
import Orders from "../dashboard/Orders"
export default function Testing() {
  return (
    <div>
        <SeachBar />
        <Chart />
        <Deposits />
        <Orders />
    </div>
  )
}
//everytime the array of context changes the dashboard updates and fetches new information from the api and passses the information to its children without any external shit
