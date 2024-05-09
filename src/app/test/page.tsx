const MarketingChart = () => {
   const acculynxFeatures = [
      {
         name: 'Customer Relationship Management (CRM)',
         description: 'Manage leads, contacts, and communication with customers.',
      },
      {
         name: 'Estimating and Quoting',
         description: 'Create accurate estimates and quotes for roofing projects.',
      },
      {
         name: 'Project Management',
         description: 'Schedule jobs, assign tasks, and track progress.',
      },
      // Add more features as needed
   ];

   const jobberFeatures = [
      {
         name: 'Customer Relationship Management (CRM)',
         description: 'Manage client information, communication, and follow-ups.',
      },
      {
         name: 'Scheduling and Dispatching',
         description: 'Efficiently schedule jobs and dispatch technicians.',
      },
      {
         name: 'Quoting and Invoicing',
         description: 'Create and send quotes, and manage invoicing and payments.',
      },
      // Add more features as needed
   ];

   const linksterFeatures = [
      {
         name: 'Project Collaboration',
         description: 'Collaborate with team members and clients on project documents.',
      },
      {
         name: 'Task Management',
         description: 'Assign tasks and track progress on construction projects.',
      },
      {
         name: 'Analytics and Reporting',
         description: 'Generate reports and analyze project data for insights.',
      },
      // Add more features as needed
   ];

   const acculynxYearlyCost = 1200; // Example yearly cost for AccuLynx
   const jobberYearlyCost = 1000; // Example yearly cost for Jobber
   const linksterYearlyCost = 1500; // Example yearly cost for Linkster

   return (
      <div className="container mx-auto">
         <h1 className="text-3xl font-bold mb-4">Feature Comparison</h1>

         <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
               <h2 className="text-xl font-bold mb-2">AccuLynx</h2>
               <ul>
                  {acculynxFeatures.map((feature, index) => (
                     <li key={index} className="mb-2">
                        <span className="font-semibold">{feature.name}:</span> {feature.description}
                     </li>
                  ))}
               </ul>
               <p className="mt-4">Yearly Cost: ${acculynxYearlyCost}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
               <h2 className="text-xl font-bold mb-2">Jobber</h2>
               <ul>
                  {jobberFeatures.map((feature, index) => (
                     <li key={index} className="mb-2">
                        <span className="font-semibold">{feature.name}:</span> {feature.description}
                     </li>
                  ))}
               </ul>
               <p className="mt-4">Yearly Cost: ${jobberYearlyCost}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
               <h2 className="text-xl font-bold mb-2">Linkster</h2>
               <ul>
                  {linksterFeatures.map((feature, index) => (
                     <li key={index} className="mb-2">
                        <span className="font-semibold">{feature.name}:</span> {feature.description}
                     </li>
                  ))}
               </ul>
               <p className="mt-4">Yearly Cost: ${linksterYearlyCost}</p>
            </div>
         </div>
      </div>
   );
};

export default MarketingChart;
