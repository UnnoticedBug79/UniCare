
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Hospital } from 'lucide-react';

interface StaffPortalProps {
  onBack: () => void;
}

const StaffPortal = ({ onBack }: StaffPortalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock patients data
  const patients = [
    {
      id: "P-2024-001234",
      name: "Sarah Johnson",
      age: 39,
      room: "A-204",
      condition: "Stable",
      lastVisit: "2024-01-15",
      allergies: ["Penicillin", "Shellfish"],
      status: "active"
    },
    {
      id: "P-2024-001235", 
      name: "Michael Chen",
      age: 45,
      room: "B-108",
      condition: "Critical",
      lastVisit: "2024-01-20",
      allergies: ["Latex"],
      status: "active"
    },
    {
      id: "P-2024-001236",
      name: "Emma Davis",
      age: 28,
      room: "C-301",
      condition: "Stable",
      lastVisit: "2024-01-18",
      allergies: [],
      status: "discharged"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Staff Portal</h1>
          <p className="text-lg text-gray-600 mt-2">Patient Management Dashboard</p>
        </div>
        <Button 
          onClick={onBack}
          variant="outline"
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Home
        </Button>
      </div>

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-sm">
          <TabsTrigger value="patients" className="text-base">Patient Search</TabsTrigger>
          <TabsTrigger value="verification" className="text-base">Data Verification</TabsTrigger>
          <TabsTrigger value="analytics" className="text-base">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6 text-blue-600" />
                <span>Patient Search & Management</span>
              </CardTitle>
              <CardDescription>Search and manage patient records securely</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input
                  placeholder="Search by patient name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg py-3 rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Patient List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Patient List</h3>
                  {filteredPatients.map((patient) => (
                    <Card 
                      key={patient.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedPatient?.id === patient.id ? 'ring-2 ring-blue-400 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                          <Badge 
                            variant={patient.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {patient.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">ID: {patient.id}</p>
                        <p className="text-sm text-gray-600">Room: {patient.room}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">Age: {patient.age}</span>
                          <Badge 
                            variant={patient.condition === 'Critical' ? 'destructive' : 'outline'}
                            className="text-xs"
                          >
                            {patient.condition}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Patient Details */}
                <div>
                  {selectedPatient ? (
                    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Hospital className="w-5 h-5 text-green-600" />
                          <span>Patient Details</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Name</label>
                            <p className="text-lg font-semibold text-gray-800">{selectedPatient.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Age</label>
                            <p className="text-lg font-semibold text-gray-800">{selectedPatient.age}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Room</label>
                            <p className="text-lg font-semibold text-gray-800">{selectedPatient.room}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Status</label>
                            <p className="text-lg font-semibold text-gray-800 capitalize">{selectedPatient.status}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-2 block">Allergies</label>
                          {selectedPatient.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedPatient.allergies.map((allergy: string, index: number) => (
                                <Badge key={index} variant="destructive" className="text-sm">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No known allergies</p>
                          )}
                        </div>

                        <div className="pt-4 space-y-2">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
                            Update Patient Records
                          </Button>
                          <Button variant="outline" className="w-full hover:bg-gray-50 transition-colors duration-200">
                            View Medical History
                          </Button>
                          <Button variant="outline" className="w-full hover:bg-gray-50 transition-colors duration-200">
                            Schedule Appointment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                      <CardContent className="flex items-center justify-center h-96">
                        <div className="text-center">
                          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg text-gray-500">Select a patient to view details</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Data Verification Center</CardTitle>
              <CardDescription>Verify and update patient biometric data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <Hospital className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Verification Tools</h3>
                <p className="text-gray-500 mb-6">Advanced biometric verification and data integrity tools</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors duration-200">
                  Access Verification Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Hospital Analytics</CardTitle>
              <CardDescription>View hospital statistics and patient flow data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center">
                  <h3 className="text-2xl font-bold text-blue-800">156</h3>
                  <p className="text-blue-600 font-medium">Active Patients</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                  <h3 className="text-2xl font-bold text-green-800">98%</h3>
                  <p className="text-green-600 font-medium">Biometric Success Rate</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
                  <h3 className="text-2xl font-bold text-purple-800">24</h3>
                  <p className="text-purple-600 font-medium">Staff Online</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPortal;
