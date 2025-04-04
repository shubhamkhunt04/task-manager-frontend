import { Form, Input, Select, Button, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createTaskAsync, updateTaskAsync } from "../features/tasks/taskSlice";
import { useState } from "react";

const { Option } = Select;

interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

interface TaskFormProps {
  existingTask?: Task;
  closeModal: () => void;
}

interface TaskFormValues {
  title: string;
  description: string;
  status: Task["status"];
}

const TaskForm = ({ existingTask, closeModal }: TaskFormProps) => {
  const [form] = Form.useForm<TaskFormValues>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: TaskFormValues) => {
    setLoading(true);
    try {
      if (existingTask) {
        await dispatch(
          updateTaskAsync({ id: existingTask.id, taskData: values })
        ).unwrap();
        message.success("Task updated successfully");
      } else {
        await dispatch(createTaskAsync(values)).unwrap();
        message.success("Task created successfully");
      }
      closeModal();
    } catch (error) {
      message.error(
        existingTask ? "Failed to update task" : "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={existingTask ? "Edit Task" : "Create Task"}
      open={true}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: existingTask?.title || "",
          description: existingTask?.description || "",
          status: existingTask?.status || "pending",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select>
            <Option value="PENDING">Pending</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="COMPLETED">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {existingTask ? "Update Task" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
