import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';

const headers = [
  { label: 'userId', key: 'userId' },
  { label: 'network', key: 'network' },
  { label: 'txHash', key: 'txHash' },
  { label: 'token', key: 'token' },
  { label: 'depositAmount', key: 'depositAmount' },
];

const data: any[] = [
  {
    userId: '0dfke3',
    network: 'ETH Mainnet',
    txHash: '0x5b7ab924553bb24553bb',
    token: 'USDT',
    depositAmount: '203.212333',
  },
  {
    userId: '0dfke3',
    network: 'ETH Mainnet',
    txHash: '0x5b7ab924553bb24553bb',
    token: 'USDT',
    depositAmount: '203.212333',
  },
  {
    userId: '0dfke3',
    network: 'ETH Mainnet',
    txHash: '0x5b7ab924553bb24553bb',
    token: 'USDT',
    depositAmount: '203.212333',
  },
];

const csvReport = {
  data: data,
  headers: headers,
  filename: 'cashflow.csv',
};

export const ExportToExcel = ({ apiData, fileName }: any) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <button onClick={(e) => exportToCSV(data, 'cashflow')}>Export</button>
      <CSVLink {...csvReport}>Export to CSV</CSVLink>
    </>
  );
};

export default ExportToExcel;
