import { useState } from "react";
import SpacesList from "../../entities/spaces/ui/sapces-list";
import SpacesCreateForm from "../../features/spaces/ui/spaces-create-form";

function SpacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <h1>Spaces</h1>
      <button onClick={() => setIsModalOpen(true)}>
        Добавить пространство
      </button>

      <SpacesCreateForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SpacesList />
    </div>
  );
}

export default SpacesPage;
