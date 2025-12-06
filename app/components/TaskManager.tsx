/* eslint-disable react-hooks/purity */
'use client';

import React, { useState } from 'react';
import { Trash2, Plus, Edit2, CheckCircle2 } from 'lucide-react';
import { Task } from '@/app/types';
import { generateId, formatDate } from '@/app/utils/helpers';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: generateId(),
      title: 'Design dashboard UI',
      description: 'Create mockups and wireframes',
      category: 'work',
      priority: 'high',
      status: 'doing',
      tags: ['design', 'ui'],
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      estimatedDuration: 480,
      createdAt: new Date(),
    },
    {
      id: generateId(),
      title: 'Morning workout',
      description: '30 minutes cardio',
      category: 'health',
      priority: 'medium',
      status: 'todo',
      tags: ['health', 'fitness'],
      dueDate: new Date(),
      estimatedDuration: 30,
      createdAt: new Date(),
    },
  ]);

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: generateId(),
        title: newTask,
        description: '',
        category: 'work',
        priority: 'medium',
        status: 'todo',
        tags: [],
        dueDate: new Date(),
        estimatedDuration: 60,
        createdAt: new Date(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status, completedAt: status === 'done' ? new Date() : undefined }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  const columns: { status: Task['status']; title: string; color: string }[] = [
    { status: 'todo', title: '📋 To Do', color: 'bg-red-500/10' },
    { status: 'doing', title: '⚡ Doing', color: 'bg-amber-500/10' },
    { status: 'done', title: '✅ Done', color: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Add Task Input */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <button onClick={addTask} className="btn btn-primary">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.status} className="space-y-4">
            <div className={`${column.color} px-4 py-3 rounded-lg flex items-center justify-between`}>
              <h3 className="font-semibold text-sm text-white">{column.title}</h3>
              <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full font-medium text-gray-300">
                {tasks.filter((t) => t.status === column.status).length}
              </span>
            </div>

            <div className="space-y-3">
              {tasks
                .filter((t) => t.status === column.status)
                .map((task) => (
                  <div key={task.id} className="card-md group hover:border-gray-500 bg-gray-900/50 border-gray-800">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-sm text-white">{task.title}</p>
                        <div className="flex gap-2 flex-wrap">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === 'high'
                              ? 'badge-danger'
                              : task.priority === 'medium'
                                ? 'badge-warning'
                                : 'badge-primary'
                              }`}
                          >
                            {task.priority}
                          </span>
                          <span className="badge-secondary text-xs">
                            {task.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Due: {formatDate(task.dueDate)}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        {task.status !== 'done' && (
                          <button
                            onClick={() =>
                              updateTaskStatus(
                                task.id,
                                task.status === 'todo'
                                  ? 'doing'
                                  : task.status === 'doing'
                                    ? 'done'
                                    : 'todo'
                              )
                            }
                            className="p-1.5 hover:bg-emerald-900/40 rounded"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 hover:bg-red-900/40 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 justify-center flex-wrap">
        {(['all', 'todo', 'doing', 'done'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'
              }`}
          >
            {f === 'all' ? 'All' : f === 'todo' ? 'To Do' : f === 'doing' ? 'In Progress' : 'Done'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
