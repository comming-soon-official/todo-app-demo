import { format, formatDistanceToNow } from "date-fns";
import { Clock, Edit, Trash } from "lucide-react";
import Link from "next/link";

import { TodoCardProps } from "@/components/TodoCard/types";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TodoStatus } from "@/context/TodosContext/types";
import { cn } from "@/lib/utils";

const TodoCard = (props: TodoCardProps) => {
  const { todo, onDelete, onToggleStatus } = props;
  const { id, title, description, status, updatedAt } = todo;

  return (
    <Card className="flex flex-col w-full overflow-hidden md:flex-row md:w-2/3">
      <div className="relative h-48 md:w-1/3">
        <img
          src="https://www.watchwithme.in/_next/image?url=https%3A%2F%2Fwatchwithme.s3.ap-south-1.amazonaws.com%2Fblogs%2Fthumbnails%2Flivekitmigration.png&w=1080&q=75"
          alt="Todo thumbnail"
          className={cn(
            "object-cover w-full h-full",
            status === TodoStatus.COMPLETED && "blur-sm"
          )}
        />
      </div>
      <div className="flex-1">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between gap-4">
            <CardTitle
              className={cn(
                "leading-tight line-clamp-1",
                status === TodoStatus.COMPLETED && "line-through opacity-50"
              )}
            >
              {title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Link
                href={`/editTodo/${id}`}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                <Edit className="w-4 h-4" />
                <span className="sr-only">Edit Todo</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => onDelete(id)}>
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
              <Switch
                checked={status === TodoStatus.COMPLETED}
                onCheckedChange={() => onToggleStatus(id)}
              />
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <CardDescription
            className={cn(
              "line-clamp-3",
              status === TodoStatus.COMPLETED && "line-through opacity-50"
            )}
          >
            {description}
          </CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              Updated {formatDistanceToNow(new Date(updatedAt))} ago
              {" • "}
              {format(new Date(updatedAt), "MMM d, yyyy h:mm a")}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TodoCard;
