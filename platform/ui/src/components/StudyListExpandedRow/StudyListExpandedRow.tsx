import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StudyListExpandedRow.css';
import ComprehensiveCoronaryAnalysisReport from '../ComprehensiveCoronaryAnalysisReport/ComprehensiveCoronaryAnalysisReport';

import Table from '../Table';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

const StudyListExpandedRow = ({ seriesTableColumns, seriesTableDataSource, children }) => {
  const [showReport, setShowReport] = useState(false);
  const analysisStatus = seriesTableDataSource.length <= 1 ? 'Analyzing' : 'Analysis Complete';

  return (
    <div className="w-full bg-black py-4 pl-12 pr-2">
      <div className="block">
        {children}
        <div className="mt-2 flex items-center text-sm">
          Analysis Status:{' '}
          <span
            className={`ml-1 flex items-center ${
              analysisStatus === 'Analyzing' ? 'text-yellow-500' : 'text-green-500'
            }`}
          >
            {analysisStatus}
            {analysisStatus === 'Analyzing' && (
              <span className="dots-animation">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            )}
          </span>
          {analysisStatus !== 'Analyzing' && (
            <button
              onClick={() => setShowReport(true)}
              className="ml-4 rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
            >
              View Report
            </button>
          )}
        </div>
      </div>

      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-8">
          <div className="relative max-h-[95vh] w-[230mm] overflow-hidden rounded-lg bg-white text-black shadow-xl">
            <button
              onClick={() => setShowReport(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-md hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="max-h-[95vh] w-full overflow-y-auto p-4">
              <ComprehensiveCoronaryAnalysisReport />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(seriesTableColumns).map(columnKey => {
                return (
                  <TableCell
                    key={columnKey}
                    cellsNum={Object.keys(seriesTableColumns).length}
                  >
                    {seriesTableColumns[columnKey]}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {seriesTableDataSource.map((row, i) => (
              <TableRow key={i}>
                {Object.keys(row).map(cellKey => {
                  const content = row[cellKey];
                  return (
                    <TableCell
                      key={cellKey}
                      className="truncate"
                      cellsNum={Object.keys(row).length}
                    >
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

StudyListExpandedRow.propTypes = {
  seriesTableDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  seriesTableColumns: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default StudyListExpandedRow;
