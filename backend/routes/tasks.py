from flask import Blueprint, request, jsonify
from supabase_client import supabase
from services.email_service import send_email

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["POST"])
def create_task():

    data = request.json

    response = supabase.table("tasks").insert({
        "title": data["title"],
        "description": data["description"],
        "assigned_to": data["assigned_to"],
        "created_by": data["created_by"]
    }).execute()

    user = supabase.table("users") \
        .select("email,name") \
        .eq("id", data["assigned_to"]) \
        .single() \
        .execute()

    send_email(
        user.data["email"],
        "New Task Assigned",
        f"""
Hello {user.data['name']},

A new task has been assigned to you.

Title: {data['title']}
Description: {data['description']}

Please log in to the Task Manager to view it.
"""
    )

    return jsonify(response.data)

@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():

    response = supabase.table("tasks").select(
        "*, assigned_user:assigned_to(email,name)"
    ).execute()

    return jsonify(response.data)

@tasks_bp.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):

    data = request.json

    response = supabase.table("tasks").update({
        "status": data["status"]
    }).eq("id", task_id).execute()

    if data["status"] == "completed":

        task = supabase.table("tasks") \
            .select("title,assigned_to,created_by") \
            .eq("id", task_id) \
            .single() \
            .execute()

        creator = supabase.table("users") \
            .select("email,name") \
            .eq("id", task.data["created_by"]) \
            .single() \
            .execute()

        assignee = supabase.table("users") \
            .select("name") \
            .eq("id", task.data["assigned_to"]) \
            .single() \
            .execute()

        send_email(
            creator.data["email"],
            "Task Completed",
            f"""
            Hello {creator.data['name']},

            The task "{task.data['title']}" has been completed by {assignee.data['name']}.

            You can log in to Task Manager to review it.
            """
            )

        return jsonify(response.data)

@tasks_bp.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):

    response = supabase.table("tasks") \
        .delete() \
        .eq("id", task_id) \
        .execute()

    return jsonify({
        "message": "Task deleted successfully"
    })

@tasks_bp.route("/users", methods=["GET"])
def get_users():

    response = supabase.table("users") \
        .select("*") \
        .execute()

    return jsonify(response.data)