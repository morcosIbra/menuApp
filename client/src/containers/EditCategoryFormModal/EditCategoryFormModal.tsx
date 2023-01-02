import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useUpdateCategoryMutation } from '../../redux/apis/categories';
import { CategoryFormInputs } from '../CategoryForm/CategorForm.types';
import locals from '../../locals/en.json';
import { EditCategoryFormModalProps } from './EditCategoryFormModal.type';

const EditCategoryFormModal = ({
  categoryData,
  isOpen,
  closeHandle
}: EditCategoryFormModalProps) => {
  const [updateCategory, { isSuccess }] = useUpdateCategoryMutation();
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    defaultValues: {
      name: categoryData.name,
      description: categoryData.description
    }
  });

  const formvValidation = {
    name: { required: true },
    description: { required: true }
  };

  const submitCategory = (formData: CategoryFormInputs) => {
    updateCategory({ id: categoryData.id, formData });
  };

  useEffect(() => {
    if (isSuccess) closeHandle();
  }, [closeHandle, isSuccess]);

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit(submitCategory)}
      open={isOpen}
      size="tiny"
      onClose={closeHandle}>
      <Modal.Header icon="pencil" content={locals.editCategory} as="h2" />
      <Modal.Content>
        <Controller
          name="name"
          rules={formvValidation.name}
          control={control}
          render={({ field }) => (
            <Form.Input
              fluid
              {...formvValidation.name}
              label="Name"
              {...field}
              placeholder="Name"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={formvValidation.name}
          render={({ field }) => (
            <Form.TextArea
              fluid
              label="Description"
              {...formvValidation.name}
              {...field}
              placeholder="Name"
            />
          )}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" icon="times" content="Close" onClick={closeHandle} />
        <Button type="submit" icon="save" color="teal" content="Save" disabled={!isValid} />
      </Modal.Actions>
    </Modal>
  );
};

export default EditCategoryFormModal;
