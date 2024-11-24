import React from 'react';

interface PatientInfo {
  name: string;
  gender: string;
  age: number;
  patientId: string;
  measurementTime: string;
  surgeryTime: string;
}

interface VesselAnalysis {
  vesselName: string;
  pressure: number;
  flowVelocity: number;
  caIMR: number;
  measurements: {
    referenceVesselDiameter: number;
    stenosisDiameter: number;
    stenosisPercentage: number;
    lesionLength: number;
    caFFR: number;
    deltaFFR: number;
    pressureGradient: number;
  };
}

const ComprehensiveCoronaryAnalysisReport: React.FC = () => {
  const patientInfo: PatientInfo = {
    name: 'Patient Name',
    gender: 'Female',
    age: 86,
    patientId: '009931',
    measurementTime: '2022-05-19 11:06:15',
    surgeryTime: '2022-05-19 11:00:44',
  };

  const vesselAnalyses: VesselAnalysis[] = [
    {
      vesselName: 'Left Circumflex (LCX)',
      pressure: 140,
      flowVelocity: 173,
      caIMR: 24.4,
      measurements: {
        referenceVesselDiameter: 2.2,
        stenosisDiameter: 1.1,
        stenosisPercentage: 49.7,
        lesionLength: 14,
        caFFR: 0.79,
        deltaFFR: 0.21,
        pressureGradient: 27,
      },
    },
    {
      vesselName: 'Left Anterior Descending (LAD)',
      pressure: 140,
      flowVelocity: 97,
      caIMR: 52.8,
      measurements: {
        referenceVesselDiameter: 2.7,
        stenosisDiameter: 1.9,
        stenosisPercentage: 29.5,
        lesionLength: 14,
        caFFR: 0.96,
        deltaFFR: 0.04,
        pressureGradient: 3,
      },
    },
    {
      vesselName: 'Right Coronary Artery (RCA)',
      pressure: 135,
      flowVelocity: 120,
      caIMR: 30.2,
      measurements: {
        referenceVesselDiameter: 3.0,
        stenosisDiameter: 2.1,
        stenosisPercentage: 30.0,
        lesionLength: 12,
        caFFR: 0.92,
        deltaFFR: 0.08,
        pressureGradient: 10,
      },
    },
  ];

  return (
    <div className="mx-auto w-full">
      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <div className="border-b border-gray-200 pb-6">
          <div className="text-center">
            <p className="text-2xl font-bold">Coronary Angiography Analysis Report</p>
          </div>
        </div>

        <div className="my-6 grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Patient Name:</span>
            <span>{patientInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{patientInfo.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Patient ID:</span>
            <span>{patientInfo.patientId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Age:</span>
            <span>{patientInfo.age}</span>
          </div>
          <div className="col-span-2 flex justify-between">
            <span className="font-medium">Measurement Time:</span>
            <span>{patientInfo.measurementTime}</span>
          </div>
          <div className="col-span-2 flex justify-between">
            <span className="font-medium">Surgery Time:</span>
            <span>{patientInfo.surgeryTime}</span>
          </div>
        </div>

        {vesselAnalyses.map((analysis, index) => (
          <div
            key={analysis.vesselName}
            className="mt-8 border-t pt-6"
          >
            <div className="my-4 space-y-2 rounded-lg bg-gray-50 p-4">
              <h3 className="text-lg font-semibold">{analysis.vesselName}</h3>
              <p className="text-sm">
                Pa: {analysis.pressure} mmHg, Blood Flow Velocity: {analysis.flowVelocity} mm/s
              </p>
              <p className="text-sm">
                caFFR: {analysis.measurements.caFFR}, caIMR: {analysis.caIMR}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Stenosis Information</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-3 py-2">Reference Diameter (mm)</th>
                    <th className="border px-3 py-2">Stenosis Diameter (mm)</th>
                    <th className="border px-3 py-2">Diameter Stenosis (%)</th>
                    <th className="border px-3 py-2">Lesion Length (mm)</th>
                    <th className="border px-3 py-2">caFFR</th>
                    <th className="border px-3 py-2">ΔcaFFR</th>
                    <th className="border px-3 py-2">Pressure Gradient</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2 text-center">
                      {analysis.measurements.referenceVesselDiameter}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {analysis.measurements.stenosisDiameter}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {analysis.measurements.stenosisPercentage}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {analysis.measurements.lesionLength}
                    </td>
                    <td className="border px-3 py-2 text-center">{analysis.measurements.caFFR}</td>
                    <td className="border px-3 py-2 text-center">
                      {analysis.measurements.deltaFFR}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {analysis.measurements.pressureGradient}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Vessel Images</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src="/assets/CA.png"
                      alt={`${analysis.vesselName} Angiogram`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 text-center text-sm text-gray-600">
                    Angiogram View
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src="/assets/FFR.png"
                      alt={`${analysis.vesselName} 3D Reconstruction`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 text-center text-sm text-gray-600">
                    3D Reconstruction
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComprehensiveCoronaryAnalysisReport;
