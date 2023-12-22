/* eslint-disable no-unused-vars */
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import LoadingUi from '../Ui/LoadingUi';
import { LuPlus } from 'react-icons/lu';
import TaskModalForm from '../Ui/TaskModalForm';
import useAxiosPublic from '../../customHooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [todo, setTodo] = useState(null);
  const [onGoing, setonGoing] = useState(null);
  const [completed, setCompleted] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const getData = useCallback(
    async (email) => {
      try {
        const response = await axiosPublic.get(`/api/tasks?email=${email}`);
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    [axiosPublic]
  );

  const { isLoading, error, data } = useQuery({
    queryKey: ['tasksData', user?.email],
    queryFn: () => getData(user?.email),
  });

  useEffect(() => {
    const todoList = data?.filter(item => item.status === 'todo');
    const ongoingList = data?.filter(item => item.status === 'todo');
    const completedList = data?.filter(item => item.status === 'todo');
    setTodo(todoList);
    setonGoing(ongoingList);
    setCompleted(completedList);
  },[data]);

  const handleClick = () => {
    setVisible(true);
  };

  if (loading && isLoading) return <LoadingUi />;
  if (!user) {
    return navigate('/signin');
  }
  if (error) {
    return <p className="text-center py-20">Something went wrong</p>;
  }
  return (
    <>
      <div className="w-full min-h-screen flex flex-col container mx-auto items-center relative">
        <div className="flex justify-between w-full items-center px-5 pt-5 mb-5">
          <div>
            <h1 className="text-4xl uppercase">Dashboard</h1>
            <p>Create and Manage your tasks here</p>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="w-fit">
              <button
                type="button"
                className="btn btn-lg btn-accent text-accent-content"
                onClick={handleClick}
              >
                <LuPlus /> <span>New Task</span>
              </button>
            </div>
            <div className="card card-side shadow-xl w-fit bg-base-200">
              <figure>
                <img
                  src={user?.photoURL}
                  alt="displayName"
                  className="w-20 h-20 object-cover"
                />
              </figure>
              <div className="card-body py-1">
                <h2 className="card-title ">{user?.displayName}</h2>
                <p className="text-primary font-semibold leading-4">
                  <Link to={`mailto:${user?.email}`}>{user?.email}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex divide-x-2 divide-dashed divide-base-300 h-full grow border-t-2 border-base-300 border-dashed">
          <div className="w-1/3 p-5">
            <h2 className="text-center uppercase pb-5">To-Do</h2>
            <div></div>
          </div>
          <div className="w-1/3 p-5">
            <h2 className="text-center uppercase pb-5">Ongoing</h2>
          </div>
          <div className="w-1/3 p-5">
            <h2 className="text-center uppercase pb-5">Completed</h2>
          </div>
        </div>
      </div>
      <TaskModalForm
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default Dashboard;
