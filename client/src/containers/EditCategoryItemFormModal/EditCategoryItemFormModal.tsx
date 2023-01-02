import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useUpdateCategoryItemMutation } from '../../redux/apis/categories';
import { CategoryFormInputs } from '../CategoryForm/CategorForm.types';
import locals from '../../locals/en.json';
import { EditCategoryItemFormModalProps } from './EditCategoryItemFormModal.type';

const EditCategoryItemFormModal = ({
  categoryItem,
  closeHandle,
  isOpen
}: EditCategoryItemFormModalProps) => {
  const [updateCategoryItem, { isSuccess }] = useUpdateCategoryItemMutation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: categoryItem.name,
      description: categoryItem.description,
      price: categoryItem.price
    }
  });

  const formValidation = {
    name: { required: true },
    description: { required: true },
    price: { required: true, min: 0 }
  };

  const submitCategory = (formData: CategoryFormInputs) => {
    updateCategoryItem({ id: categoryItem.id, data: formData });
  };

  useEffect(() => {
    if (isSuccess) closeHandle();
  }, [closeHandle, isSuccess]);

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit(submitCategory)}
      size="tiny"
      onClose={closeHandle}
      open={isOpen}>
      <Modal.Header icon="pencil" content={locals.editCategoryItem} as="h2" />
      <Modal.Content>
        <Controller
          name="name"
          rules={formValidation.name}
          control={control}
          render={({ field }) => (
            <Form.Input fluid {...formValidation.name} label="Name" {...field} placeholder="Name" />
          )}
        />
        <Controller
          name="price"
          rules={formValidation.price}
          control={control}
          render={({ field }) => (
            <Form.Input
              fluid
              {...formValidation.price}
              label="Price"
              {...field}
              placeholder="Price"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={formValidation.name}
          render={({ field }) => (
            <Form.TextArea
              fluid
              label="Description"
              {...formValidation.name}
              {...field}
              placeholder="Name"
            />
          )}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" icon="times" content="Close" onClick={closeHandle} />
        <Button type="submit" color="green" icon="save" content="Save" />
      </Modal.Actions>
    </Modal>
  );
};

export default EditCategoryItemFormModal;
