class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :priority
      t.boolean :isArchived
      t.string :status, default: "In progress"
      # this is only supported in PG
      # https://stackoverflow.com/questions/21312278/storing-arrays-in-database-json-vs-serialized-array
      t.text :tags, array: true, default: []
      t.timestamps
    end
  end
end
