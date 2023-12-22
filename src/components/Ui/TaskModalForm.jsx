/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { LuX } from 'react-icons/lu';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useState } from 'react';
import useAxiosPublic from '../../customHooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';

const TaskModalForm = ({ visible, setVisible }) => {
  const {user} = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onsubmit = async (data) => {
    const task = {email : user?.email, status: 'todo', ...data};
    axiosPublic
      .post('/api/tasks', task)
      .then((response) => {
        if (response?.data?.insertedId) {
          toast.success('Task Created Successfully');
          setVisible(false);
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={`fixed backdrop-blur top-0 left-0 bottom-0 w-full flex-col justify-center items-center ${visible ? 'flex' : 'hidden'}`}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg bg-base-100 border p-10 pt-5 rounded shadow-xl border-base-300 relative"
      >
        <div className="w-fit absolute top-2 right-2">
          <button
            type="button"
            className="btn btn-circle btn-ghost text-lg"
            onClick={() => setVisible(false)}
          >
            <LuX />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col gap-y-5 pt-7"
        >
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-xs mb-1"
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title here"
              className={`input input-bordered w-full ${errors.title ? '!border-error' : undefined}`}
              {...register('title', {
                required: 'Title is required',
              })}
            />
            {errors.title && <p className="mt-1 text-error text-sm">{errors.title.message}</p>}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-xs mb-1"
            >
              Description
            </label>
            <textarea
              className={`textarea textarea-bordered ${errors.desc ? '!border-error' : undefined}`}
              placeholder="Description"
              {...register('desc', {
                required: 'Description is required',
              })}
            />
            {errors.desc && <p className="mt-1 text-error text-sm">{errors.desc.message}</p>}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-xs mb-1"
            >
              Deadline
            </label>
            {/* <input type="text" placeholder="Enter title here" className="input input-bordered w-full" {...register('desc')} /> */}
            <Controller
              name="deadline"
              control={control}
              render={() => (
                <DatePicker
                  className="input input-bordered w-full"
                  {...register('deadline', {
                    required: 'Select a deadline please',
                  })}
                  onChange={(date) => {
                    setValue('deadline', date);
                    setStartDate(date);
                  }}
                  selected={startDate}
                />
              )}
            />
            {errors.deadline && <p className="mt-1 text-error text-sm">{errors.deadline.message}</p>}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-xs mb-1"
            >
              Priority
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue="Select the priority"
              {...register('priority', {
                required: 'Priority selection is required',
              })}
            >
              <option disabled>Select the priority</option>
              <option value={'low'}>Low</option>
              <option value={'moderate'}>Moderate</option>
              <option value={'high'}>High</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-neutral text-neutral-content text-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

TaskModalForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default TaskModalForm;
