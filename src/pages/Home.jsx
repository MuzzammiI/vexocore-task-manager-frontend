import TaskList from '../components/TaskList.jsx';

export default function Home() {
  return (
    <div className='mt-24 p-6 md:p-0 lg-p-0'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold mb-4'>Welcome to the Task Manager</h1>
      <p className='mb-8'>Manage your tasks efficiently and effectively.</p>
      </div>

      <TaskList  />
    </div>
  );
}