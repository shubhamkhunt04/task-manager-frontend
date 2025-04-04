import { useState, useEffect } from "react";
import {
  Button,
  Popconfirm,
  message,
  Spin,
  Typography,
  Empty,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { deleteTaskAsync, fetchTasksAsync } from "../features/tasks/taskSlice";
import TaskForm from "../components/TaskForm";
import {
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  StyledSpace,
  PageHeader,
  TaskGrid,
  EmptyStateContainer,
  LoadingContainer,
  StyledCard,
} from "../styles/StyledComponents";

const { Title, Text } = Typography;

const Tasks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await dispatch(deleteTaskAsync(taskId)).unwrap();
      message.success("Task deleted successfully");
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "IN_PROGRESS":
        return "processing";
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircleOutlined />;
      case "IN_PROGRESS":
        return <SyncOutlined spin />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  if (loading && !tasks.length) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <StyledSpace direction="vertical" size="large">
      <PageHeader>
        <Title level={2}>My Tasks</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Task
        </Button>
      </PageHeader>

      {tasks.length === 0 ? (
        <EmptyStateContainer>
          <Empty
            description="No tasks found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => setIsFormOpen(true)}>
              Create Your First Task
            </Button>
          </Empty>
        </EmptyStateContainer>
      ) : (
        <TaskGrid>
          {tasks.map((task: any) => (
            <StyledCard
              key={task.id}
              title={task.title}
              extra={
                <Tag
                  icon={getStatusIcon(task.status)}
                  color={getStatusColor(task.status)}
                >
                  {task.status}
                </Tag>
              }
              actions={[
                <Button type="link" onClick={() => handleEdit(task)}>
                  Edit
                </Button>,
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => handleDelete(task.id)}
                >
                  <Button danger type="link">
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
              hoverable
            >
              <Text>{task.description}</Text>
            </StyledCard>
          ))}
        </TaskGrid>
      )}

      {isFormOpen && (
        <TaskForm existingTask={selectedTask} closeModal={handleCloseModal} />
      )}
    </StyledSpace>
  );
};

export default Tasks;
