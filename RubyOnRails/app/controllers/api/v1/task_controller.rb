class Api::V1::TaskController < ApplicationController
  # class Api::TaskController < ApplicationController
  def index
    tasks = Task.all
    render json: tasks, status: 200
  end

  def create
    task = Task.new(
      title: dto[:title],
      priority: dto[:priority],
      isArchived: dto[:isArchived],
      status: dto[:status],
      tags: dto[:tags], # FIX: tags is null on created
    )

    if task.save
      render json: task, status: 200
    else
      render json: { error: "Failed to create." }
    end
  end

  def show
    task = Task.find_by(id: params[:id])

    if task
      render json: task, status: 200
    else
      render json: { error: "Task not found" }
    end
  end

  def update
    task = Task.find_by(id: params[:id])
    task.update(
      title: dto[:title],
      priority: dto[:priority],
      isArchived: dto[:isArchived],
      status: dto[:status],
      tags: dto[:tags], # FIX: tags is null on created
    )

    render json: task
  end

  def destroy
    task = Task.find_by(id: params[:id])

    if task
      task.destroy
      render json: { message: "Deleted" }
    else
      render json: { error: "Task not found" }
    end
  end

  private

  # Action Controller Parameters -> Create/UpdateTaskDto
  def dto
    params.require(:task)
          .permit([
                    :title,
                    :status,
                    :priority,
                    :isArchived,
                    :tags
                  ])
  end
end
